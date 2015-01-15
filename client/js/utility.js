function Time() {
    this.now;
    this.last;
    this.deltaTime;
}

// Calculates the deltaTime in seconds. The maximum delta time is set to one second in case you switch tabs
// Switching tabs causes loops to slow down or halt which would otherwise cause deltaTime to become incredibly large
Time.prototype.calc = function() {
    if(!this.last)
        this.last = this.timestamp();
    
    this.now = this.timestamp();
    this.deltaTime = Math.min(1, (this.now - this.last)/1000);  
    this.last = this.now; 
}

Time.prototype.timestamp = function() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}


