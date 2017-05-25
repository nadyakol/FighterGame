class Fighter {
	constructor(name = 'Fighter', power = 1, health = 150) {
  	this.name = name;
    this.power = power;
    this.health = health;
  };

	setDamage(damage) {
  	this.health -= damage;
    console.log(`${this.name} health: ${this.health}`);
  };
  
  hit(enemy, point) {
  	if (!enemy instanceof Fighter) {
  		console.error(`enemy not instance of class Fighter`)
      return false;
    }
    enemy.setDamage(point * this.power);
  };
  
  isAlive() {
  	return this.health > 0;
  };  
}

class ImprovedFighter extends Fighter {
	doubleHit(enemy, point) {
  	console.info('double hit!!!');
 		super.hit(enemy, point * 2);
  };
  
  isDoubleHit() {
  	if (typeof this.chance === 'undefined') {
    	this.chance = 1 - this.health / 150;
    }
    return Math.random() <= this.chance;
  }
}

var names = {
	names: ['Superman', 'Spiderman', 'Ironman', 'Joker', 'Trump', 'Obama', 'Poroshenko'],
	random: function() {
  	var key = Math.floor(Math.random() * this.names.length),
			name = this.names[key];    
      this.names.splice(key, 1);
      return name;
	}
};

function random(min, max) {
	return Math.random() * (max - min) + min;
}

var getWinner = (fighter, improvedFighter) => fighter.isAlive() ? fighter : improvedFighter;

function fight(fighter, improvedFighter, ...point) {
	var step = 0,
  	i = 0; 
	while (fighter.isAlive() && improvedFighter.isAlive()) {
  	var currentPoint = point[i];
    
    if (step % 2 === 0) {
    	fighter.hit(improvedFighter, currentPoint);
    } else {
    	if (improvedFighter.isDoubleHit()) {
      	improvedFighter.doubleHit(fighter, currentPoint);
      } else {
      	improvedFighter.hit(fighter, currentPoint);
      }
    }
  	
    i++;
    if (i >= point.length) {
    	i = 0;
    }
  	step++;
  }   
}

var fighter = new Fighter(names.random(), random(1, 1.5), random(150, 200));

var improvedFighter = new ImprovedFighter(names.random(), random(1, 1.5), random(100, 150));

console.info(fighter, improvedFighter);

fight(fighter, improvedFighter, 25, 13, 45);

var winner = getWinner(fighter, improvedFighter);

console.info(`Winner: ${winner.constructor.name} ${winner.name}`);