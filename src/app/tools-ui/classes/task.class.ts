export class TaskHandle {

    constructor(private doFunc: Function) { }

    ready(params: any = null): TaskHandle {
        this.doFunc(params);
        return this;
    }
}

export class Task {

    private _next: Function;
    private _task: Function;

    constructor(doFunc: (handle: TaskHandle) => void) { this._task = doFunc; }

    next(doFunc: Function) {
        this._next = doFunc;
        this._task(new TaskHandle(this._next));
    }
}

export class TaskQuery {
    private _ready = new Function;
    private taskCx = 0;
    private taskQuery = new Array<Task>();
    private params = new Array<any>();
    push(task) { this.taskQuery.push(task); }
    run() {
        this.taskCx = 0;
        for (let i = 0; i < this.taskQuery.length; i++) {
            this.params.push(null);
        }
        this.do();
    }
    do() {
        const i = this.taskCx;
        if (i < this.taskQuery.length && i >= 0) {
            this.taskQuery[i].next(param => {
                this.params[i] = param;
                this.taskCx++;
                this.do();
            });
        } else {
            this._ready(this.params);
        }
    }
    ready(doFunc: Function) { this._ready = doFunc; }
}

export class TaskRunner {
    private _ready = new Function;
    private taskCx = 0;
    private taskQuery = new Array<Task>();
    private params = new Array<any>();
    push(task) { this.taskQuery.push(task); }
    run() {
        this.taskCx = 0;
        for (let i = 0; i < this.taskQuery.length; i++) {
            this.taskQuery[i].next(param => {
                this.params[i] = param;
                this.taskCx++;
                if (this.taskCx === this.taskQuery.length) {
                    this._ready(this.params);
                }
            });
        }
    }
    ready(doFunc: Function) { this._ready = doFunc; }
}
