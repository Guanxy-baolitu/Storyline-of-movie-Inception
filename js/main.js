window.onload=function(){
    //
    // Storyline
    //
    ["Cobb","Saito","Arthur","Yusuf","Eames","Mal",
        "Fischer","Ariadne","Browning","Nash"].forEach(function(d,i){
            var selectedUl;
            if(i%2===0){
                selectedUl=d3.select("#leftUl");
            }
            else {
                selectedUl=d3.select("#rightUl");
            }
            var li=selectedUl.append("li");
            li.append("img")
                .attr("src","img/"+d+".jpg")
                .attr("class","icon");
            li.append("p")
                .attr("class","name")
                .html(d);
            li.append("input")
                .attr("id","Checkbox"+d)
                .attr("type","checkbox")
                .attr("checked","checked");
            d3.select("#"+d)
                .on("mouseover",function(){
                    d3.select("#"+d)
                        .style("opacity",1);
                })
                .on("mouseout",function(){
                    d3.select("#"+d)
                        .style("opacity",0.7);
                });
        })
    $(function() {
        $('#selectAll').click(function() {
            $(':checkbox').each(function() {
                this.checked = true;
                updateStorylines();
            });
        });
    });
    $(function() {
        $('#selectNone').click(function() {
            $(':checkbox').each(function() {
                this.checked = false;
                updateStorylines();
            });
        });
    });
    d3.selectAll("input")
        .on("change",updateStorylines);
    function updateStorylines(){
        var countNum=0;
        ["Saito","Arthur","Yusuf","Browning","Nash","Eames","Mal","Cobb",
            "Fischer","Ariadne"].forEach(function(d,i){
                var checkboxs=d3.select("#Checkbox"+d);
                if(!checkboxs.empty()){
                    if(checkboxs.property("checked")){
                        countNum+=1;
                        d3.select("#"+d).style("opacity",0.7)
                            .style("pointer-events","");
                        d3.select("#"+d+"_1_").style("opacity",1)
                            .style("pointer-events","");
                    }
                else{
                        d3.select("#"+d)
                            .style("opacity",0)
                            .style("pointer-events","none");
                        d3.select("#"+d+"_1_").style("opacity",0)
                            .style("pointer-events","none");
                    }
                }
            })
        if(countNum>0){
            d3.select("#Kidnapping").style("opacity",1).style("pointer-events","");
            d3.select("#Aircraft").style("opacity",1).style("pointer-events","");
            d3.select("#GunWar1").style("opacity",1).style("pointer-events","");
            d3.select("#GunWar3").style("opacity",1).style("pointer-events","");

        }
        else{
            d3.select("#Kidnapping").style("opacity",0).style("pointer-events","none");
            d3.select("#Aircraft").style("opacity",0).style("pointer-events","none");
            d3.select("#GunWar1").style("opacity",0).style("pointer-events","none");
            d3.select("#GunWar3").style("opacity",0).style("pointer-events","none");
        }
    }
    //
    // EventDots
    //
    var div=d3.select("body").append("div")
        .attr("class","d3-tip")
        .style("opacity",0);
    d3.csv("doc/event.csv",function(error,data){
        data.forEach(function(d){
            d3.select("#"+ d.eventID)
                .on("mouseover",function(){
                    div.transition()
                        .duration(500)
                        .style("opacity",1);
                    div	.html("<img width='230px' hight='150px'src='img/"+ d.eventID+".gif'/>")
                        //"<Br/>"+"<p class='d3-tip-text'>"+d.Caption+"</p>")
                        .style("left", (d3.event.pageX - 115) + "px")
                        .style("top", (d3.event.pageY -130) + "px");
                })
                .on("mouseout",function(){
                    div.transition()
                        .duration(500)
                        .style("opacity", 0)
                })
        });
    });
    //
    // DreamScene
    //
    var blackRect=d3.select("rect");
    var smallTipDiv=d3.select("body").append("div")
        .attr("class","d3-small-tip")
        .style("opacity",0)
        .html("<p style='position: relative; top:-11px;'>Press me</p>");
    var dreamerTipDiv=d3.select("body").append("div")
        .attr("class","d3-small-tip")
        .style("opacity",0);
    var missionFailedDiv=d3.select("body").append("div")
        .attr("class","d3-small-tip")
        .style("opacity",0)
        .html("<p style='position: relative; top:-11px;'>mission failed</p>");
    var killedHerselfDiv=d3.select("body").append("div")
        .attr("class","d3-small-tip")
        .style("opacity",0)
        .html("<p style='position: relative; top:-11px;'>Mal killed herself</p>");
    d3.csv("doc/scene.csv",function(error,data){
        data.forEach(function(d){
            d3.select("#"+ d.sceneID)
                .on("mouseover",function(){
                    if(d.dreamer!="?"){
                        dreamerTipDiv.transition()
                            .duration(500)
                            .style("opacity",.9);
                    }
                    else{
                        dreamerTipDiv.transition()
                            .duration(0)
                            .style("opacity",0);
                    }
                    if(d.sceneID =="Level1" || d.sceneID =="Level2" || d.sceneID =="Level3" || d.sceneID =="Level4")
                        smallTipDiv.transition()
                            .duration(500)
                            .style("opacity",.9);
                    else
                        smallTipDiv.transition()
                            .duration(500)
                            .style("opacity",0);
                    if(d.sceneID == "House1" || d.sceneID == "House2")
                        missionFailedDiv.transition()
                            .duration(500)
                            .style("opacity",.9);
                    else
                        missionFailedDiv.transition()
                            .duration(500)
                            .style("opacity",0);
                    if (d.sceneID == "WithMal1" || d.sceneID == "WithMal2" || d.sceneID == "WithMal3" || d.sceneID == "WithMal4" || d.sceneID == "WithMal")
                        killedHerselfDiv.transition()
                            .duration(500)
                            .style("opacity",.9)
                    else
                        killedHerselfDiv.transition()
                            .duration(500)
                            .style("opacity",0)
                })
                .on("mousemove", function(){
                    smallTipDiv
                        .style("left", (d3.event.pageX-48) + "px")
                        .style("top", (d3.event.pageY-18) + "px");
                    dreamerTipDiv
                        .html("<p style='position: relative; top:-11px;'>"+d.dreamer+"'s dream</p>")
                        .style("left", (d3.event.pageX-48) + "px")
                        .style("top", (d3.event.pageY-42) + "px");
                    missionFailedDiv
                        .style("left", (d3.event.pageX-48) + "px")
                        .style("top", (d3.event.pageY-18) + "px");
                    killedHerselfDiv
                        .style("left", (d3.event.pageX-48) + "px")
                        .style("top", (d3.event.pageY-18) + "px");
                })
                .on("click",function(){
                    if(d.sceneID =="Level1" || d.sceneID =="Level2" || d.sceneID =="Level3" || d.sceneID =="Level4")
                    {
                        d3.select("body")
                            .style("background-image","url('img/"+ d.sceneID+".jpg')");
                        blackRect.transition()
                            .duration(500)
                            .style("opacity", 0.3);
                    }
                })
                .on("mouseout",function(){
                    smallTipDiv.transition()
                        .duration(300)
                        .style("opacity", 0);
                    dreamerTipDiv.transition()
                        .duration(300)
                        .style("opacity",0);
                    missionFailedDiv.transition()
                        .duration(300)
                        .style("opacity",0);
                    killedHerselfDiv.transition()
                        .duration(300)
                        .style("opacity",0);
                    d3.select("body")
                        .style("background-image","url('img/index.jpg')");
                    blackRect.transition()
                        .duration(300)
                        .style("opacity", 1);
                })
        });
    });
}
