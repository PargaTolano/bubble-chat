//pixels
const mindiam = 10;
//pixels
const maxdiam = 100;
//pixels per second
const bubbleSpeed = 15;

/**
 * @param {number}  origin      number from which to interpolate
 * @param {number}  dest        number to interpolate to
 * @param {numer}   percentage  number from 0 - 1 as the interpolation factor
 */
function lerp( origin, dest, percentage){
    return origin * (1 - percentage) + dest * percentage;
}

//using dom objects out of react cycle for efficency
class BubblePoolObject{

    /**
     * @type {HTMLElement}
     */
    _domObject;

    constructor(){
        this._domObject                         = document.createElement('li');
        this._domObject.style.position          = 'absolute';
        this._domObject.style.display           = 'inline-block';
        this._domObject.style.bottom            = 0;
        this._domObject.style.transformOrigin   = 'left top';
        this._domObject.style.borderRadius      = '50%';
        this._domObject.style.width             = '10px';
        this._domObject.style.height            = '10px';
    }

    reset(){
        x = 4* Math.pow(Math.random() - 0.5, 3) + 0.5;
        x *= window.innerWidth;

        const diam = lerp(mindiam, maxdiam, pow(Math.random(),5) );

        this._domObject.style.width     = diam+'px';
        this._domObject.style.height    = diam+'px';
        this._domObject.style.transform = `translate( calc( -50% + ${x}px), 101%)`;
    }

    update(deltaTime){

    }

}

class BubblePool {

    /**
     * @type {BubblePoolObject[]}
     */
    resources;

    /**
     * 
     * @type {HTMLElement} bubble container 
     */
    _container;

    /**
     * @type {number} determines max bubble instances to pool
     * */
    _maxResources;

    /**
     * @param {number} maxResources 
     */
    constructor(maxResources){
        this._maxResources = maxResources;
    }

    /**
     * @param {BubblePoolObject} bubble 
     */
    returnToPool(bubble){
        if(this.resources.length !== maxResources){
            this.resources.push(bubble);
        }
    }
}

//Singleton-Like implementation
let _instance = new BubblePool();

export { _instance as bubblePool };