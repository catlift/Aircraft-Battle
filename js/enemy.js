//敌机对象

function Enemy(type) {
	this.ele = document.createElement("div");
	this.id = parseInt(Math.random() * 10000) + "";
	this.score = 0; //分数
	this.hp = 0;
	this.speed = 0;
	this.dieImgs = [];
	this.init = function() {
		switch (type) {

			//大型飞机
			case this.Enemy_Type_Large:
				this.ele.className = "enemy-large";
				this.hp = this.Enemy_HP_Large; //血量
				this.speed = this.Enemy_Speed_Large; //速度
				this.dieImgs = ["img/plane3die1.png", "img/plane3die2.png", "img/plane3die3.png", "img/plane3die4.png", "img/plane3die5.png", "img/plane3die6.png"];
				this.score = 30;
				break;

			//中型飞机
			case this.Enemy_Type_Middle:
				this.ele.className = "enemy-middle";
				this.hp = this.Enemy_HP_Middle; //血量
				this.speed = this.Enemy_Speed_Middle; //速度
				this.dieImgs = ["img/plane2die1.png", "img/plane2die2.png", "img/plane2die3.png", "img/plane2die4.png"];
				this.score = 20;
				break;

			//小型飞机
			case this.Enemy_Type_Small:
				this.ele.className = "enemy-small";
				this.hp = this.Enemy_HP_Small; //血量
				this.speed = this.Enemy_Speed_Small; //速度
				this.dieImgs = ["img/plane1die1.png", "img/plane1die2.png", "img/plane1_die3.png"];
				this.score = 10;
				break;
		}

		//添加敌机到游戏界面上
		gameEngine.ele.appendChild(this.ele);
			//将飞机的地址存放到数组中
		gameEngine.enemys[this.id] = this;

		//位置
		var x = parseInt(Math.random() * (gameEngine.ele.offsetWidth - this.ele.offsetWidth));
		this.ele.style.left = x + "px";
		this.ele.style.top = -this.ele.offsetHeight + "px";

		return this;
	}

	//移动
	this.move = function() {
		var self = this;
		//开启定时器, 让敌机向下移动
		this.timer = setInterval(function() {
			//移动
			// self.ele.style.top = self.ele.offsetTop + self.speed + "px";
			//如果敌机超出下边界, 则关闭定时器,且移除敌机
			if (self.ele.offsetTop > gameEngine.ele.offsetHeight || self.ele.offsetLeft > gameEngine.ele.offsetWidth || self.ele.offsetLeft < 0) {
				clearInterval(self.timer); // 关闭定时器
				gameEngine.ele.removeChild(self.ele); //移除敌机
				delete gameEngine.enemys[self.id]; // 从gameEngine.enemys对象中移除当前敌机对象
			}
			
			// 获取玩家位置
			var playX = parseInt(document.querySelector(".myplane").style.left);
			var playY = parseInt(document.querySelector(".myplane").style.top);
			
			// 获取自身位置
			var enemyX = parseInt(self.ele.style.left);
			var enemyY = parseInt(self.ele.style.top);
			
			// 计算距离
			var isX = (playX - enemyX) / 300;
			var isY = (playY - enemyY) / 300;
			
			if(enemyY > playY || (enemyY-playY > 0)) {
				self.ele.style.top = self.ele.offsetTop + self.speed * 2 + "px";
			}else {
				self.ele.style.top = self.ele.offsetTop + isY * self.speed + "px";
				self.ele.style.left = self.ele.offsetLeft + isX * self.speed + "px";
			}
		}, 30);
	},

	//受到一点伤害
	this.hurt = function() {
		this.hp--; //掉一点血
		if (this.hp == 0) { 
			// 掉一点血
			this.boom();
			//把分数添加
			gameEngine.scoreNode.innerHTML = (gameEngine.scoreNode.innerHTML-0) + this.score;
		}
	},

	//爆炸
	this.boom = function() {
		var self = this;
		clearInterval(this.timer); //关闭定时器
		var index = 0;

		//爆炸动画
		var dieTimer = setInterval(function() {
			self.ele.style.background = "url("+ self.dieImgs[index] +")";
			index++;
			if (index >= self.dieImgs.length) {
				clearInterval(dieTimer); //关闭定时器
				gameEngine.ele.removeChild(self.ele); //移除敌机
				delete gameEngine.enemys[self.id]; //将当前的敌机对象从gameEngine.enemys对象中移除
			}
		}, 50);

	}
}

//c创建字面量对象
//{Enemy}敌机类 其中prototype 表示Enemy类的原型
//原型类：Enemy就是son类, Enemy.prototype就是父类
Enemy.prototype = {
	Enemy_Type_Large: 1,
	Enemy_Type_Middle: 2,
	Enemy_Type_Small: 3,

	Enemy_HP_Large: 8,
	Enemy_HP_Middle: 4,
	Enemy_HP_Small: 1,

	Enemy_Speed_Large: 2,
	Enemy_Speed_Middle: 4,
	Enemy_Speed_Small: 8
}
