export interface MessageEvent {
    bubbles: boolean;
    cancelBubble: boolean;
    cancelable: boolean;
    composed: boolean;
    currentTarget: any;
    data: string;
    defaultPrevented: boolean;
    detail: any;
    eventPhase: number;
    explicitOriginalTarget: any;
    isTrusted: boolean;
    originalTarget: any;
    target: any;
    timeStamp: number;
    type: string;
}

export const RecParams = {
    debugAll: false,
    CONNECTING: WebSocket.CONNECTING,
    OPEN: WebSocket.OPEN,
    CLOSING: WebSocket.CLOSING,
    CLOSED: WebSocket.CLOSED,
};

export class ReconnectingWebSocket {

    private reconnectAttempts: number;
    private readyState: number;
    private protocol: string;
    private ws: WebSocket;
    private settings: { [key: string]: string | number | boolean };
    private eventTarget: HTMLDivElement;
    private timedOut: boolean;
    private forcedClose: boolean;
    public addEventListener: any;
    public removeEventListener: any;
    public dispatchEvent: any;

    /**
     * An event listener to be called when the WebSocket connection's readyState changes to OPEN;
     * this indicates that the connection is ready to send and receive data.
     */
    onopen = function (event) { };
    /** An event listener to be called when the WebSocket connection's readyState changes to CLOSED. */
    onclose = function (event) { };
    /** An event listener to be called when a connection begins being attempted. */
    onconnecting = function (event) { };
    /** An event listener to be called when a message is received from the server. */
    onmessage = (event: MessageEvent) => { };
    /** An event listener to be called when an error occurs. */
    onerror = function (event) { };

    constructor(private url: string, private protocols: string | string[], private options = {}) {

        // Default settings
        this.settings = {

            /** Whether this instance should log debug messages. */
            debug: false,

            /** Whether or not the websocket should attempt to connect immediately upon instantiation. */
            automaticOpen: true,

            /** The number of milliseconds to delay before attempting to reconnect. */
            reconnectInterval: 3000,
            /** The maximum number of milliseconds to delay a reconnection attempt. */
            maxReconnectInterval: 30000,
            /** The rate of increase of the reconnect delay. Allows reconnect attempts to back off when problems persist. */
            reconnectDecay: 1.5,

            /** The maximum time in milliseconds to wait for a connection to succeed before closing and retrying. */
            timeoutInterval: 3000,

            /** The maximum number of reconnection attempts to make. Unlimited if null. */
            maxReconnectAttempts: null,

            /** The binary type, possible values 'blob' or 'arraybuffer', default 'blob'. */
            binaryType: 'blob'
        };
        if (!options) { options = {}; }

        // Overwrite and define settings with options if they exist.
        for (const key in this.settings) {
            if (typeof options[key] !== 'undefined') {
                this.settings[key] = options[key];
            }
        }

        // These should be treated as read-only properties

        /** The URL as resolved by the constructor. This is always an absolute URL. Read only. */
        this.url = url;

        /** The number of attempted reconnects since starting, or the last successful connection. Read only. */
        this.reconnectAttempts = 0;

        /**
         * The current state of the connection.
         * Can be one of: WebSocket.CONNECTING, WebSocket.OPEN, WebSocket.CLOSING, WebSocket.CLOSED
         * Read only.
         */
        this.readyState = WebSocket.CONNECTING;

        /**
         * A string indicating the name of the sub-protocol the server selected; this will be one of
         * the strings specified in the protocols parameter when creating the WebSocket object.
         * Read only.
         */
        this.protocol = null;

        // Private state variables

        const self = this;
        this.forcedClose = false;
        this.timedOut = false;
        this.eventTarget = document.createElement('div');

        // Wire up "on*" properties as event handlers

        this.eventTarget.addEventListener('open', (event) => { this.onopen(event); });
        this.eventTarget.addEventListener('close', (event) => { this.onclose(event); });
        this.eventTarget.addEventListener('connecting', (event) => { this.onconnecting(event); });
        this.eventTarget.addEventListener('message', (event) => { this.onmessage(<any>event); });
        this.eventTarget.addEventListener('error', (event) => { this.onerror(event); });

        // Expose the API required by EventTarget
        this.addEventListener = this.eventTarget.addEventListener.bind(this.eventTarget);
        this.removeEventListener = this.eventTarget.removeEventListener.bind(this.eventTarget);
        this.dispatchEvent = this.eventTarget.dispatchEvent.bind(this.eventTarget);
        if (this.settings.automaticOpen === true) {
            this.open(false);
        }
    }

    private generateEvent(s) {
        const evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(s, false, false, null);
        return evt;
    }

    open(reconnectAttempt) {
        this.ws = new WebSocket(this.url, this.protocols || []);
        this.ws.binaryType = <string>this.settings.binaryType;

        if (reconnectAttempt) {
            if (this.settings.maxReconnectAttempts && this.reconnectAttempts > this.settings.maxReconnectAttempts) {
                return;
            }
        } else {
            this.eventTarget.dispatchEvent(this.generateEvent('connecting'));
            this.reconnectAttempts = 0;
        }

        if (this.settings.debug || RecParams.debugAll) {
            console.log('ReconnectingWebSocket', 'attempt-connect', this.url);
        }

        const localWs = this.ws;
        const timeout = setTimeout(() => {
            if (this.settings.debug || RecParams.debugAll) {
                console.log('ReconnectingWebSocket', 'connection-timeout', this.url);
            }
            this.settings.timedOut = true;
            localWs.close();
            this.timedOut = false;
        }, this.settings.timeoutInterval);

        this.ws.onopen = (event) => {
            clearTimeout(timeout);
            if (this.settings.debug || RecParams.debugAll) {
                console.log('ReconnectingWebSocket', 'onopen', this.url);
            }
            this.protocol = this.ws.protocol;
            this.readyState = WebSocket.OPEN;
            this.reconnectAttempts = 0;
            const e: any = this.generateEvent('open');
            e.isReconnect = reconnectAttempt;
            reconnectAttempt = false;
            this.eventTarget.dispatchEvent(e);
        };

        this.ws.onclose = (event) => {
            clearTimeout(timeout);
            this.ws = null;
            if (this.forcedClose) {
                this.readyState = WebSocket.CLOSED;
                this.eventTarget.dispatchEvent(this.generateEvent('close'));
            } else {
                this.readyState = WebSocket.CONNECTING;
                const e: any = this.generateEvent('connecting');
                e.code = event.code;
                e.reason = event.reason;
                e.wasClean = event.wasClean;
                this.eventTarget.dispatchEvent(e);
                if (!reconnectAttempt && !this.timedOut) {
                    if (this.settings.debug || RecParams.debugAll) {
                        console.log('ReconnectingWebSocket', 'onclose', this.url);
                    }
                    this.eventTarget.dispatchEvent(this.generateEvent('close'));
                }

                const _timeout = <number>this.settings.reconnectInterval *
                    Math.pow(<number>this.settings.reconnectDecay, <number>this.reconnectAttempts);
                setTimeout(() => {
                    this.reconnectAttempts++;
                    this.open(true);
                }, _timeout > this.settings.maxReconnectInterval ? this.settings.maxReconnectInterval : timeout);
            }
        };
        this.ws.onmessage = (event) => {
            if (this.settings.debug || RecParams.debugAll) {
                console.log('ReconnectingWebSocket', 'onmessage', this.url, event.data);
            }
            const e: any = this.generateEvent('message');
            e.data = event.data;
            this.eventTarget.dispatchEvent(e);
        };
        this.ws.onerror = (event) => {
            if (this.settings.debug || RecParams.debugAll) {
                console.log('ReconnectingWebSocket', 'onerror', this.url, event);
            }
            this.eventTarget.dispatchEvent(this.generateEvent('error'));
        };
    }

    /**
     * Transmits data to the server over the WebSocket connection.
     *
     * @param data a text string, ArrayBuffer or Blob to send to the server.
     */
    send(data) {
        if (this.ws) {
            if (this.settings.debug || RecParams.debugAll) {
                console.log('ReconnectingWebSocket', 'send', this.url, data);
            }
            return this.ws.send(data);
        } else {
            console.error('WEBSOCKET ERROR');
        }
    }

    /**
     * Closes the WebSocket connection or connection attempt, if any.
     * If the connection is already CLOSED, this method does nothing.
     */
    close(code, reason) {
        // Default CLOSE_NORMAL code
        if (typeof code === 'undefined') {
            code = 1000;
        }
        this.forcedClose = true;
        if (this.ws) {
            this.ws.close(code, reason);
        }
    }

    /**
     * Additional public API method to refresh the connection if still open (close, re-open).
     * For example, if the app suspects bad data / missed heart beats, it can try to refresh.
     */
    refresh() {
        if (this.ws) {
            this.ws.close();
        }
    }
}
