class InteractiveHelpGuide {
    defaultOptions = {
        helpMessageBoxBackground: "white",
        overlayBackground: "rgba(0,10,20,0.5)",
        transitionSpeed: "500"
    }
    constructor(guidesObjectArray, options=false) {
        this.guides = guidesObjectArray;
        this.options = (options == false) ? this.defaultOptions : options;
        this.guidePosition = 0
        this.generateBorderFrames()
        this.generateHelpMessageBox()
        this.runGuide(this.guidePosition)
    }

    nextGuide() {
        return function() {
            this.guidePosition++;
            this.runGuide(this.guidePosition)
        }.bind(this)
    }

    runGuide(guideNumber){
        let guide = this.guides[guideNumber]
        let target = document.querySelector(guide.target)
        let targetRect = target.getBoundingClientRect()
        this.adjustBorderFrame("left",targetRect)
        this.adjustBorderFrame("right",targetRect)
        this.adjustBorderFrame("top",targetRect)
        this.adjustBorderFrame("bottom",targetRect)
        this.adjustHelpBox(targetRect,guide)
    }

    endGuide() {
        return function() {
            let all = document.querySelectorAll('.igh')
            all.forEach(element => {
                element.style.opacity = 0
                setTimeout(() => {
                    element.remove()    
                }, this.options.transitionSpeed + 100);
                
            });
        }.bind(this)
    }

    adjustHelpBox(targetRect,guide) {
        let helpBox = document.getElementById(`igh-help-message-box`)
        let bodyRect = document.body.getBoundingClientRect()

        helpBox.style.opacity = 1
        // position the box on the left if realestate calls for iiti
        if(bodyRect.width / 2 > targetRect.right){
            helpBox.style.left = targetRect.right + 20
        } else {
            let helpBoxRect = helpBox.getBoundingClientRect()
            helpBox.style.left = targetRect.left - helpBoxRect.width - 20
        }
        helpBox.style.top = targetRect.top
        helpBox.innerHTML = `<h1>${guide.title}</h1><div>${guide.body}</div>`
        if(this.guides.length - this.guidePosition == 1){
            helpBox.appendChild(this.generateNextButton("end",this.endGuide()))
        } else {
            helpBox.appendChild(this.generateNextButton("next",this.nextGuide()))
        }
        
    }

    adjustBorderFrame(pos,targetRect){
        let borderFrame = document.getElementById(`igh-${pos}`)
        let bodyRect = document.body.getBoundingClientRect()
        borderFrame.style.opacity = 1

        switch(pos){
            case 'left':
                borderFrame.style.right = bodyRect.width - targetRect.left
                borderFrame.style.top = targetRect.top
                borderFrame.style.bottom = bodyRect.height - targetRect.bottom 
                borderFrame.style.left = 0
                break
            case 'right':
                borderFrame.style.left = targetRect.right
                borderFrame.style.top = targetRect.top
                borderFrame.style.bottom = bodyRect.height - targetRect.bottom 
                borderFrame.style.right = 0
                break  
            case 'bottom':
                borderFrame.style.bottom = bodyRect.height - targetRect.top
                borderFrame.style.top = 0
                borderFrame.style.right = 0
                borderFrame.style.left = 0
                break    
            case 'top':
                borderFrame.style.top = targetRect.bottom 
                borderFrame.style.bottom = 0
                borderFrame.style.right = 0
                borderFrame.style.left = 0
                break      
        }
        
    }
    generateNextButton(text,callback){
        let baseFrameCSS = `background: green; color: white; padding: 4px 3px; border-radius: 3px;`
        let button = document.createElement("a")
        button.setAttribute("id",`igh-next-button`)
        button.classList.add("igh")
        button.style.cssText = baseFrameCSS
        button.innerText = text
        button.addEventListener("click",  callback  )
        return button
    }
    generateHelpMessageBox(){
        let baseCSS = `background: ${this.options.helpMessageBoxBackground}; z-index: 10000001; opacity: 0; position: fixed; top:50%; left: 50%; width: 200px; max-width: 250px; min-height: 100px; transition: all ${this.options.transitionSpeed}ms ease-in; border-radius: 4px; box-shadow: 3px 3px 3px rgba(0,0,0,.5);`
        let box = document.createElement("div")
        box.setAttribute("id",`igh-help-message-box`)
        box.classList.add("igh")
        box.style.cssText = baseCSS
        box.innerHTML = '<h1></h1><div></div>'
        document.querySelector("body").appendChild(box)
    }

    generateFrame(pos){
        let baseFrameCSS = `background: ${this.options.overlayBackground}; z-index: 10000000; opacity: 0; position: fixed; transition: all ${this.options.transitionSpeed}ms ease-in;`
        let frame = document.createElement("div")
        frame.setAttribute("id",`igh-${pos}`)
        frame.classList.add("igh")
        frame.style.cssText = baseFrameCSS
        frame.addEventListener("click",  this.endGuide()  )
        return frame
    }      
    generateBorderFrames(){
        document.querySelector("body").appendChild(this.generateFrame("left"))
        document.querySelector("body").appendChild(this.generateFrame("right"))
        document.querySelector("body").appendChild(this.generateFrame("top"))
        document.querySelector("body").appendChild(this.generateFrame("bottom"))
    }  
}