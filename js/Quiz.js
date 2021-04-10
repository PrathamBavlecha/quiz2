class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide()

    //write code to change the background color here
    background("Cyan")

    //write code to show a heading for showing the result of Quiz
    this.title = createElement("h1")
    this.title.html("Result of the Quiz")
    this.title.position(350,0)
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo()

    //write condition to check if contestantInfor is not undefined
    if(allContestants!==undefined){
      var displayPosition = 300
      for(var plr in allContestants){
        var correctAns = "2"
        if(correctAns===allContestants[plr].answer){
          fill("green")
        }else{
          fill("red")
        }
        displayPosition = displayPosition + 20
            textSize(20)
            text(allContestants[plr].name+":"+allContestants[plr].answer,120,displayPosition)
            if(correctAns===allContestants[plr].answer){
              text(allContestants[plr].name+"  gave the correct answer",300,displayPosition)
            }else{
              text(allContestants[plr].name+"  gave the incorrect answer",300,displayPosition)
            }
            
      }
    }

    //write code to add a note here
    fill("blue")
      textSize(20)
      text("NOTE: Contestants who answered are highlighted in green color",130,230)

    //write code to highlight contest who answered correctly
    
  }
}
