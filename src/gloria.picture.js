'use strict';
var GloriaJS = GloriaJS || {};

/**
 * 
 */
GloriaJS.pictures = (()=>{
    
    let picturesOnPage;
    
    /** 
     * 
     */
    document.addEventListener("DOMContentLoaded",()=>{

        //List of items with gl-picture class
        picturesOnPage = document.getElementsByClassName("gl-picture");
        
        // Looping for setting things on for each item found with gl-picture class
        for (const glPicture of picturesOnPage) {

            // If the title property is not set, then GlPicture will set it 
            if(glPicture.getAttribute("title")==""){
                glPicture.setAttribute("title","Click to select a picture...");
            }

            // By default, all gl-picture items have the pointer instead of the arrow cursor
            glPicture.style.cursor = "pointer";

            // Now creatin the file selector (<input type="file">)
            const fileViewer = document.createElement("input");
            fileViewer.type = "file";
            // Contraint to accept only Pictures
            fileViewer.accept = "image/*";
            // Hidding our selector
            fileViewer.setAttribute("hidden","hidden");

            // Adding the selector in the body of our html document
            document.body.appendChild(fileViewer);

            // Hidden field for data manipulations purpose
            let hiddenValue = document.createElement("input");
            if(document.getElementById(glPicture.dataset.glSave)!=undefined){
                hiddenValue.type = "hidden";
                // Each hidden field will have its name from a glPicture element
                hiddenValue.name = glPicture.getAttribute("name");
                document.getElementById(glPicture.dataset.glSave).appendChild(hiddenValue)
            }

            // Protecting pictures from downloading
            if(glPicture.dataset.glProtect!=undefined){

                // checking if data-gl-protect = "true" or data-gl-protect = "protect"
                if(glPicture.dataset.glProtect.toLowerCase() == "true" || glPicture.dataset.glProtect.toLowerCase() == "protect"){
                    
                    // Forcing the cursor to be the arrow one
                    glPicture.style.cursor = "default";

                    // The protection is a transparent div with the concerned GlPicture size
                    const protection = document.createElement("div");
                    protection.style.width = glPicture.style.width;
                    if(glPicture.getAttribute("width")!=undefined){
                        protection.setAttribute("width",glPicture.getAttribute("width"))
                        protection.style.width = protection.getAttribute("width")+"px";
                    }
                    protection.style.height = glPicture.style.height;
                    if(glPicture.getAttribute("height")!=undefined){
                        protection.setAttribute("height",glPicture.getAttribute("height"));
                        protection.style.height = protection.getAttribute("height")+"px";
                    }
                    protection.style.backgroundColor = "#00000000";

                    
                    if(glPicture.style.display == "block"){
                        protection.style.display = "block";
                        protection.style.marginTop = "-"+protection.style.height;
                        console.log("-"+protection.style.width);
                    }else{
                        protection.style.display = "inline-block";
                        protection.style.marginLeft = "-"+protection.style.width;
                    }
                    
                    // Adding the protection
                    glPicture.after(protection);
                }
            }

            // Linking the GlPicture item click with its fileviewer click
            glPicture.addEventListener("click",()=>{
                fileViewer.click();
            });

            // Hadling the fileViewer change event
            fileViewer.addEventListener("change",(e)=>{
                let glStreamer = new FileReader();
                glStreamer.onload = function(evt){
                    if(glPicture.tagName.toLowerCase()=="img"){
                        glPicture.setAttribute("value",evt.target.result);
                        glPicture.setAttribute("src",evt.target.result);

                        if(document.getElementById(glPicture.dataset.glTarget)!=undefined){
                            document.getElementById(glPicture.dataset.glTarget).setAttribute("src",evt.target.result);
                        }
                        if(document.getElementById(glPicture.dataset.glSave)!=undefined){
                            hiddenValue.value = evt.target.result.toString();
                        }
                    }else if(glPicture.tagName.toLowerCase()=="a" || glPicture.tagName.toLowerCase()=="button"){
                        if(document.getElementById(glPicture.dataset.glTarget)!=undefined){
                            document.getElementById(glPicture.dataset.glTarget).setAttribute("src",evt.target.result);
                            document.getElementById(glPicture.dataset.glTarget).setAttribute("value",evt.target.result);
                        }
                        if(document.getElementById(glPicture.dataset.glSave)!=undefined){
                            hiddenValue.value = evt.target.result.toString();
                            hiddenValue.click();
                        }
                    }else{
                        if(glPicture.tagName.toLocaleLowerCase() != "div"){
                            if(document.getElementById(glPicture.dataset.glTarget)!=undefined){
                                document.getElementById(glPicture.dataset.glTarget).setAttribute("src",evt.target.result);
                                
                            }
                            if(document.getElementById(glPicture.dataset.glSave)!=undefined){
                                hiddenValue.value = evt.target.result.toString();
                            }
                        }else{
                            glPicture.style.backgroundImage = "url("+evt.target.result+")";
                            glPicture.style.backgroundSize = "contain";
                            glPicture.style.backgroundRepeat = "no-repeat";
                            glPicture.style.backgroundPositionY = "center";
                        }
                        
                    }
                    
                }
                glStreamer.readAsDataURL(e.target.files[0]);
            });

        }
       
    });

    console.log("Gloria Pictures By T. Prince WAMINA");

})();