//variables
const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
var cwh = 620;
var trackwh = 600;
var rota = (360*2) + 0;
var x = 360;
var y = 610;
var tarx = 0;
var tary = 0;
var truetarx = 0;
var truetary = 0;
var cx = 1; //Start this is a guess but find a corner specifically left;
var cy = 4; //Start this is definite
var px = cx;
var py = cy;
var onetime = true;

var obj = [];
var d = [];
const s = 1;

var al = true;
var start = true;
var finish = false;
var s1 = false;
var s2 = false;
var s3 = false;
var s4 = true;
var time = 0;
var stage = 1

function animate() {
  requestAnimationFrame(animate);
  //background
  background();
  var t = new Bot(x,y,rota);

  // x = moveX(t.x,false,rota);
  // y = moveY(t.y,false,rota);
  
  //Setting Obstecles
  obj[0] = new Block(310,85,"v");
  obj[1] = new Block(310,385,"v");
  obj[2] = new Block(460,85,"v");
  obj[3] = new Block(85,310,"h");
  obj[4] = new Block(385,310,"h");
  obj[5] = new Block(535,460,"h");
  obj[6] = new Block(235,160,"h");
  obj[7] = new Block(235,460,"h");

  //Target Point
  var ep = new TargetPoint(85, 535);
  //console.log(al);

  //Sensor(Touch);
  for (var r = 0; r < 8; r++) {
    //console.log(r);
    //Sensor(sim)

    d[r] = getDistance((t.x+25),(t.y+25),obj[r].x,obj[r].y);
    d[8] = getDistance((t.x+25),(t.y+25),ep.x,ep.y);
    
    
    //Algorithm (Detection)
    if (finish == false) {
      //Collision Avoidence
      if (((s1 == false && al == true && d[r] > 27 && x > 10 && x < 560 && y > 10 && y < 560 && d[8] > 5) || start == true)) { 

        //Start
        if (time < 800 && start == true) {
          time = time + 1;
          x = moveX(t.x,true,rota,false);
          y = moveY(t.y,true,rota,false);
          //initial start to find left corner
          tarx = 4;
          tary = 4;
          truetarx = 4;
          truetary = 4;
        } 
        if (start == true && time >= 800) {
          //stop movement and end of start
          x = moveX(t.x,false,rota,false);
          y = moveY(t.y,false,rota,false);
          start = false;
          time = 0;
        }


        //Target x|y
        console.log(tarx,tary,truetarx,truetary);
        if (tarx != cx && start == false) {
          if ((tarx - cx) < 0 && cy == tary) {
            rota = 360 + 270;
            if (time < 1220 && (tarx - cx) != 0) {
              time = time + 1;
              x = moveX(t.x,true,rota,false);
              y = moveY(t.y,true,rota,false);
              console.log((tarx - cx) < 0);
            } else if (time >= 1220) {
              px = cx;
              cx = cx-1;
              py = cy;
              x = moveX(t.x,true,rota,false);
              y = moveY(t.y,true,rota,false);
              time = 0;
            }
          } else if ((tarx - cx) > 0 && cy == tary) {
            if (time < 1220 && (tarx - cx) != 0) {
              time = time + 1;
              x = moveX(t.x,true,rota,false);
              y = moveY(t.y,true,rota,false);
              //console.log(time);
            } else if (time >= 1220) {
              px = cx;
              cx = cx+1;
              py = cy;
              x = moveX(t.x,true,rota,false);
              y = moveY(t.y,true,rota,false);
              time = 0;
            }
            rota = 360 + 90;
          }
        }
        if (tary != cy && start == false) {
          //console.log((tary - cy) < 0 && cx == tarx);
          if ((tary - cy) < 0 && cx == tarx) {
            if (time < 1220 && (tary - cy) != 0) {
              time = time + 1;
              x = moveX(t.x,true,rota,false);
              y = moveY(t.y,true,rota,false);
              //console.log(time);
            } else if (time >= 1220) {
              py = cy;
              cy = cy-1;
              px = cx;
              x = moveX(t.x,true,rota,false);
              y = moveY(t.y,true,rota,false);
              time = 0;
              //console.log(cy,py);
            }
            rota = 360 + 360;
          } else if ((tary - cy) > 0 && cx == tarx) {
            console.log((tary - cy) > 0 && cx == tarx);
            if (time < 1220 && (tary - cy) != 0) {
              time = time + 1;
              x = moveX(t.x,true,rota,false);
              y = moveY(t.y,true,rota,false);
              //console.log(time);
            } else if (time >= 1220) {
              py = cy;
              cy = cy+1;
              px = cx;
              //console.log(cy,py);
              x = moveX(t.x,true,rota,false);
              y = moveY(t.y,true,rota,false);
              time = 0;
            }
            rota = 360 + 180;
          }
          
        }
        //console.log(time);


        //Retrack
        //console.log(cx,cy,px,py);
        //console.log("X: " + cx + ", Y: " + cy);
        if ((truetarx != tarx) || (truetary != tary)) {
          //console.log((truetarx != tarx) || (truetary != tary) && s2 == true);
          
          if (((cy!=py) || s3 == true) && (truetarx != tarx)) {
            
            if (cx > truetarx) {
              if (px > cx) {
                tarx = tarx-1;
                console.log("x1");
              } else if (px < cx && (cx == 2 || cx == 3)) {
                tarx = tarx+1;
                //console.log("x2");
              }
              //console.log("r1a");
            } else if (cx < truetarx) {
              if (px < cx) {
                tarx = tarx+1;
                //console.log("x3");
              } else if (px > cx && (cx == 2 || cx == 3) ) {
                tarx = tarx-1;
                
                console.log("x4");
              }
              //console.log("r2a");
            }
          } else if (((cx!=px) || s3 == true) && (truetary != tary)) {
            
            if (cy > truetary) {
              if (py > cy) {
                tary = tary-1;
                //console.log("r3");
              }
            } else if (cy < truetary) {2
              if (py < cy) {
                tary = tary+1;
                //console.log("r4");
              }
            }
          }
          if (cx==px && (truetarx != tarx) && cy == tary) {
            if (cx > truetarx && tary == cy) {
              
              tarx = tarx-1;
              //console.log("r3");
              
            } else if (cx < truetarx && tary == cy) {
              
              tarx = tarx+1;
              //console.log("r4");
              
            }
          } else if (cy==py && (truetary != tary) && cx == tarx) {
            
            
            if (cy > truetary) {
              tary = tary-1;
              console.log("r3");
            } else if (cy < truetary) {
              tary = tary+1;
              console.log("r4");
            }
          }
          s3 = false;
        }
        if ((cx == tarx && cy == tary) && (cx != truetarx || cy != truetary)) {
          if (s3 == true) {
            false;
          }
          console.log(finish);
        }


        //UnderSensor
        if (x <=10) {
          cx = 1;
          px = 1;
          s3 = true;
          //console.log(s3);
          //truetarx = 1;
          //truetary = 1;
        } else if (x >= 560) {
          cx = 4;
          px = 4;
          s3 = true;
        } else if (y <=10) {
          cy = 1;
          py = 1;
        } else if (y >=560) {
          cy = 4;
          py = 4;
        }

        //New Target
        
        
        if (cx === 4 && cy === 4 && s4 === true && stage === 1) {
          stage = 2;
          truetarx = 4;
          truetary = 1;
          tarx = 4;
          tary = 1;
          cx = 4;
          cy = 4;
          s4 = false;
          
        } else if (cx == 4 && cy == 1 && s4 == true && stage == 2) {
          truetarx = 1;
          truetary = 1;
          tarx = 1;
          tary = 1;
          cx = 4;
          cy = 1;
          s3 = true;
          s4 = false;
          stage = 3;
        } else if (cx == 1 && cy == 1 && s4 == true && stage == 3) {
          truetarx = 1;
          truetary = 4;
          tarx = 1;
          tary = 4;
          cx = 1;
          cy = 1;
          s3 = true;
          s4 = false;
          stage = 4;
        } else if (cx != 4 || cx != 1 || cy != 4 || cy != 1) {
          s4 = true;
        }
      } else if ((d[r] <= 27 || x <= 10 || x >= 560 || y <= 10 || y >= 560)) {
        time = 0;
        al = false;
        x = moveX(t.x,false,rota,false);
        y = moveY(t.y,false,rota,false);
        document.getElementById("x").innerHTML = "X: " + x;
        document.getElementById("y").innerHTML = "Y: " + y; 
        console.log("t");
        //console.log(tarx,tary);
      } else if (d[8] < 5) {
        time = 0;
        al = false;
        finish = true;
        x = moveX(t.x,false,rota,false);
        y = moveY(t.y,false,rota,false);
        console.log(x < 10 || x > 610 || y < 10 || y > 610);
      }
    }

    //Backoff
    if (al == false) {
      if (time <= 425) {
        time = time + 1;
        x = moveX(t.x,true,rota,true);
        y = moveY(t.y,true,rota,true);
      } else if (time >= 425) {
        x = moveX(t.x,false,rota,true);
        y = moveY(t.y,false,rota,true);
        tarx = cx;
        tary = cy;
        al = true;
        s1 = true;
        time = 0;
      }
    } 

    //Avoidence
    if (s1 == true) {
      //console.log(cx,cy);
      if ((t.rot == 90 || t.rot == 270)) {
        console.log("a1");
        if (cy == 4) {
          tary = tary-1;
          tarx = cx; 
          console.log("a");
        } else if (cy == 1) {
          tary = tary+1;
          tarx = cx; 
          console.log("b");
        } else if (cy == 2 || cy == 3) {
          if (cy > truetary) {
            if (py > cy) {
              tary = tary-1;
              tarx = cx;
              console.log("b1");
            }
          } else if (cy < truetary) {
            if (py < cy) {
              tary = tary+1;
              tarx = cx;
              console.log("b2");
            }
          }
        }
      } else if (t.rot == 360 || t.rot == 0 || t.rot == 180) {
        console.log("a2");
        if (cx == 4) {
          tarx = 3;
          tary = cy;
          console.log("c");
        } else if (cx== 1) {
          tarx = tarx+1;
          tary = cy;
          console.log("d");
        } else if (cx == 2 || cx == 3) {
          console.log("da");
          if (px > cx) {
            tarx = tarx-1;
            tary = cy;
            console.log("d1");
          } else if (px < cx) {
            tarx = tarx+1;
            tary = cy;
            console.log("d2");
          }
        }
      }

      // console.log(tarx,tary, cx,cy);
      s1 = false;
    }

  }
}


//background function
function background() {
  c.beginPath();
  c.rect(0, 0, cwh, cwh);
  c.fillStyle = "white";
  c.fill();

  c.lineWidth = 4
  c.beginPath();
  c.strokeStyle = "red";
  c.rect(10, 10, 600, 600);
  c.fillStyle = "white";
  c.fill();
  c.stroke();

  for(var i = 1; i < 4; i++) {
    //horizontal
    c.lineWidth = 2
    c.beginPath();
    c.strokeStyle = "black";
    c.moveTo(10, ((150*i)+10));
    c.lineTo(610, ((150*i)+10));
    c.stroke();

    //vertical
    c.lineWidth = 2
    c.beginPath();
    c.strokeStyle = "black";
    c.moveTo(((150*i)+10), 10);
    c.lineTo(((150*i)+10), 610);
    c.stroke();
  }  
}



//Object Bot
function Bot(x,y,rot) {
  this.x = x;
  this.y = y;
  this.rot = rot;
  if (rot > 360) {
    this.rot = rot - (Math.floor(rot/360)*360);
  } 
  //console.log(this.rot);

  if (this.ftrf == true) {
    if (this.rot >= 0 && this.rot <= 90) {
      this.x = this.x(this.rot/90);
    }
  }

  //Base
  c.beginPath();
  c.rect(this.x, this.y, 50, 50);
  c.fillStyle = "black";
  c.fill();

  
  //Rotation Indicator

  c.beginPath();
  c.arc(this.x+25, this.y+25, 24, 0, 2 * Math.PI);
  c.strokeStyle = "blue";
  c.stroke();

  if (this.rot >= 0 && this.rot <= 90) {

    this.rx = (this.x + 20) + (20 * (this.rot / 90));
    this.ry = this.y + (20 * (this.rot / 90));

    c.beginPath();
    c.rect(this.rx, this.ry, 10, 10);
    c.fillStyle = "red";
    c.fill();
    //console.log(this.rot, this.rx, this.ry);

  } else if (this.rot >= 90 && this.rot <= 180) {

    this.rx = (this.x + 40) - (20 * ((this.rot - 90) / 90));
    this.ry = (this.y + 20) + (20 * ((this.rot - 90) / 90));

    c.beginPath();
    c.rect(this.rx, this.ry, 10, 10);
    c.fillStyle = "red";
    c.fill();
    //console.log(this.rot, this.rx, this.ry);

  } else if (this.rot >= 180 && this.rot <= 270) {

    this.rx = (this.x + 20) - (20 * ((this.rot - 180) / 90));
    this.ry = (this.y + 40) - (20 * ((this.rot - 180) / 90));

    c.beginPath();
    c.rect(this.rx, this.ry, 10, 10);
    c.fillStyle = "red";
    c.fill();
    //console.log(this.rot, this.rx, this.ry);
  } else if (this.rot >= 270 && this.rot <= 360) {

    this.rx = (this.x) + (20 * ((this.rot - 270) / 90));
    this.ry = (this.y + 20) - (20 * ((this.rot - 270) / 90));

    c.beginPath();
    c.rect(this.rx, this.ry, 10, 10);
    c.fillStyle = "red";
    c.fill();
    //console.log(this.rot, this.rx, this.ry);
  }
}



//Object obstecle
function Block(x,y,facing) {
  this.x = x;
  this.y = y;
  this.facing = facing;

  if (this.facing == "h") {
    c.beginPath();
    c.moveTo(this.x - 75, this.y);
    c.lineTo(this.x + 75, this.y);
    c.lineWidth = 5;
    c.strokeStyle = "red";
    c.stroke();
  } else if (this.facing == "v"){
    c.beginPath();
    c.moveTo(this.x, this.y - 75);
    c.lineTo(this.x, this.y + 75);
    c.lineWidth = 5;
    c.strokeStyle = "red";
    c.stroke();
  }
}


//Object Target Point
function TargetPoint(x,y) {
  this.x = x;
  this.y = y;

  c.beginPath();
  c.arc(this.x, this.y, 3, 0, 2 * Math.PI);
  c.strokeStyle = "blue";
  c.fillStyle = "blue";
  c.fill();
  c.stroke();

  //console.log("t");
}

function diff (num1, num2) {
  if (num1 > num2) {
    return (num1 - num2);
  } else {
    return (num2 - num1);
  }
}

function getDistance(x1, y1, x2, y2) {
    var deltaX = diff(x1, x2);
    var deltaY = diff(y1, y2);
    var dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    return (dist);
}

//Bot Default Movements on X-axis
function moveX(x,trf,rot,r) {
  this.x = x;
  this.r = r;
  if (rot > 360) {
    this.rot = rot - (Math.floor(rot/360)*360);
  } 
  if (trf == true && this.r == false) {
    if (this.rot >= 0 && this.rot <= 90) {
      this.x = this.x + ((this.rot/90)*s);
    } else if (this.rot >= 90 && this.rot <= 180) {
      this.x = this.x + ((1-((this.rot-90)/90))*s);
    } else if (this.rot >= 180 && this.rot <= 270) {
      this.x = this.x - (((this.rot-180)/90)*s);
    } else if (this.rot >= 270 && this.rot <= 360) {
      this.x = this.x - ((1-((this.rot-270)/90))*s);
    }
  } else if (trf == true && this.r == true) {
    if (this.rot >= 0 && this.rot <= 90) {
      this.x = this.x - ((this.rot/90)*s);
    } else if (this.rot >= 90 && this.rot <= 180) {
      this.x = this.x - ((1-((this.rot-90)/90))*s);
    } else if (this.rot >= 180 && this.rot <= 270) {
      this.x = this.x + (((this.rot-180)/90)*s);
    } else if (this.rot >= 270 && this.rot <= 360) {
      this.x = this.x + ((1-((this.rot-270)/90))*s);
    }
  }
  return this.x;
}


//Bot Default Movements on Y-axis
function moveY(y,trf,rot,r) {
  this.y = y;
  if (rot > 360) {
    this.rot = rot - (Math.floor(rot/360)*360);
  } 
  if (trf == true && this.r == false) {
    if (this.rot >= 0 && this.rot <= 90) {
      this.y = this.y - ((1-(this.rot/90))*s);
    } else if (this.rot >= 90 && this.rot <= 180) {
      this.y = this.y + (((this.rot-90)/90)*s);
    } else if (this.rot >= 180 && this.rot <= 270) {
      this.y = this.y + ((1-(this.rot-180)/90)*s);
    } else if (this.rot >= 270 && this.rot <= 360) {
      this.y = this.y - (((this.rot-270)/90)*s);
    }
  } else if (trf == true && this.r == true) {
    if (this.rot >= 0 && this.rot <= 90) {
      this.y = this.y + ((1-(this.rot/90))*s);
    } else if (this.rot >= 90 && this.rot <= 180) {
      this.y = this.y - (((this.rot-90)/90)*s);
    } else if (this.rot >= 180 && this.rot <= 270) {
      this.y = this.y - ((1-(this.rot-180)/90)*s);
    } else if (this.rot >= 270 && this.rot <= 360) {
      this.y = this.y + (((this.rot-270)/90)*s);
    }
  }
  return this.y;
}
animate();