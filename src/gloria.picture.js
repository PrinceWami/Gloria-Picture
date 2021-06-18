'use strict';
var GloriaJS = GloriaJS || {};

GloriaJS.pictures = (()=>{
    
    let picturesOnPage;
    
    document.addEventListener("DOMContentLoaded",()=>{
        picturesOnPage = document.getElementsByClassName("gl-picture");
        
        for (const glPicture of picturesOnPage) {

            if(glPicture.getAttribute("title")==""){
                glPicture.setAttribute("title","Cliquer pour modifier l'image...");
            }

            glPicture.style.cursor = "pointer";

            const fileViewer = document.createElement("input");
            fileViewer.type = "file";
            fileViewer.accept = "image/*";
            fileViewer.setAttribute("hidden","hidden");

           
            document.body.appendChild(fileViewer);

            let hiddenValue = document.createElement("input");
            if(document.getElementById(glPicture.dataset.glSave)!=undefined){
                hiddenValue.type = "hidden";
                hiddenValue.name = glPicture.getAttribute("name");
                document.getElementById(glPicture.dataset.glSave).appendChild(hiddenValue)
            }

            if(glPicture.dataset.glProtect!=undefined){
                if(glPicture.dataset.glProtect.toLowerCase() == "true" || glPicture.dataset.glProtect.toLowerCase() == "protect"){
                    glPicture.style.cursor = "default";
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
                    
                    glPicture.after(protection);
                }
            }

            glPicture.addEventListener("click",()=>{
                fileViewer.click();
            });

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

    console.log("Gloria Pictures By Prince WAMINA");

})();

