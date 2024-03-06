
import * as fct from "/src/js/fonctions.js";

var player;
var boutonFeu;
var groupeBullets;
var groupeCibles;
var cible;
var joueurTire=false;

export default class niveau1 extends Phaser.Scene {
  constructor() {
    super({
      key: "niveau1"
    });
  }

  preload() {
    this.load.image("Phaser_tuilesbateau", "src/assets/map vikings/bateau viking.png");
    this.load.image("Phaser_tuilesciel", "src/assets/map vikings/ciel vikings.png");
    this.load.image("Phaser_tuilesplateforme", "src/assets/map vikings/plateforme viking.png");
    this.load.image("Phaser_tuilesprops", "src/assets/map vikings/props vikings.png");
    this.load.tilemapTiledJSON("carte", "src/assets/map vikings/map vikings.tmj");
    this.load.image("bullet", "src/assets/ballon.png");
    this.load.spritesheet("cible", "src/assets/viking.png", {
      frameWidth: 160,
      frameHight:190
    });
  }

  create() {
    this.player = this.physics.add.sprite(100, 100, "img_perso");
    this.player.scale = 0.7;
    this.player.setDepth(2);
    this.player.refreshBody();
    this.player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, this.groupe_plateformes);

    this.player.direction = 'right';

    groupeBullets = this.physics.add.group();
   
    boutonFeu = this.input.keyboard.addKey('A');

    const carteDuNiveau = this.add.tilemap("carte");

    const tileset = carteDuNiveau.addTilesetImage(
      "XUkwBe",
    "Phaser_tuilesciel"
    );  

    const tileset1 = carteDuNiveau.addTilesetImage(
      "TX Village Props",
    "Phaser_tuilesprops"
    );

    const tileset2 = carteDuNiveau.addTilesetImage(
      "TX Tileset Ground",
    "Phaser_tuilesplateforme"
    );
    const tileset3 = carteDuNiveau.addTilesetImage(
      "T8GGyJ",
    "Phaser_tuilesbateau"
    );

    const TileLayer_1 = carteDuNiveau.createLayer(
              "TileLayer1",
              [tileset , tileset3]
            );

    const TileLayer_2  = carteDuNiveau.createLayer(
              "TileLayer2",
              tileset2
            );

    const TileLayer_3 = carteDuNiveau.createLayer(
              "TileLayer3",
              tileset1
            );
           
    TileLayer_2.setCollisionByProperty({ estSolide: true });
    this.physics.add.collider(this.player, TileLayer_2);

    TileLayer_1.setCollisionByProperty({ estSolide: true });
    this.physics.add.collider(this.player, TileLayer_1);

    TileLayer_3.setCollisionByProperty({ estSolide: true });
    this.physics.add.collider(this.player, TileLayer_3);

    cible = this.physics.add.group();
    var e1 = cible.create(200, 40, "cible");
    e1.setScale(0.5);
    var e2 = cible.create(1075, 44, "cible");
    e2.setScale(0.5);
    var e3 = cible.create(700, 44, "cible");
    e3.setScale(0.5);

    var e4 = cible.create(2000, 40, "cible");
    e4.setScale(0.5);
    var e5 = cible.create(1700, 44, "cible");
    e5.setScale(0.5);
    var e6 = cible.create(2500, 44, "cible");
    e6.setScale(0.5);
    var e7 = cible.create(2500, 200, "cible");
    e7.setScale(0.5);

    this.physics.add.collider(cible, this.groupe_plateformes);
    this.physics.add.collider(cible, TileLayer_2);
    this.physics.add.collider(cible, TileLayer_1);
    this.physics.add.collider(cible, TileLayer_3);
    this.physics.add.collider(cible, this.player);

    this.physics.add.collider(groupeBullets, TileLayer_1, function(bullet, groupe_plateformes){
      bullet.destroy();
    });
    this.physics.add.collider(groupeBullets, TileLayer_2, function(bullet, groupe_plateformes){
      bullet.destroy();
    });
    this.physics.add.collider(groupeBullets, TileLayer_3, function(bullet, groupe_plateformes){
      bullet.destroy();
    });
    this.physics.add.collider(groupeBullets, cible, function(bullet, cible){
      
      cible.destroy();
    });

    this.physics.add.overlap(groupeBullets, cible, hitCible, null, this);

    this.physics.world.setBounds(0, 0, 3200, 640);
    this.cameras.main.setBounds(0, 0, 3200, 640);
    this.cameras.main.startFollow(this.player); 

    this.physics.add.collider(this.player, cible, restartOnCollision, null, this);
     
     

  }

  update() {
    if (this.clavier.left.isDown) {
      this.player.direction = 'left';
      this.player.setVelocityX(-160);
      this.player.anims.play("anim_tourne_gauche", true);
    } else if (this.clavier.right.isDown) {
      this.player.direction = 'right';
      this.player.setVelocityX(160);
      this.player.anims.play("anim_tourne_droite", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("anim_face");
    }
    if (this.clavier.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-330);
    }

    if (!this.player.body.blocked.down ) {
      if (this.clavier.right.isDown) {
        if (joueurTire==false) {
          this.player.anims.play("anim_saute_droite", true);
        }
        this.player.direction = 'right';
      } else if (this.clavier.left.isDown) {
        if (joueurTire==false) {
          this.player.anims.play("anim_saute_gauche", true);
        }
        this.player.direction = 'left';
      }
    }

    if (Phaser.Input.Keyboard.JustDown(boutonFeu)) {
      tirer(this.player);
    } 
    
   
    checkPlayerPosition.call(this);


    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        this.scene.switch("selection");
      }
    }
  }
  

   
  
}



//fonction tirer( ), prenant comme paramètre l'auteur du tir
function tirer(player) {
  var coefDir;
  if (player.direction == 'left') { coefDir = -1; } else { coefDir = 1 }
  // on crée la balle a coté du joueur
  var bullet = groupeBullets.create(player.x + (25 * coefDir), player.y +10, 'bullet');
  // parametres physiques de la balle.
  bullet.setCollideWorldBounds(true);
  bullet.body.onWorldBounds = true;
  bullet.body.allowGravity =false;
  bullet.setVelocity(1000 * coefDir, 0); // vitesse en x et en y
}





function hitCible(bullet, cible) {
  bullet.destroy();
  cible.destroy();
}



function checkPlayerPosition() {
  if (this.player.y >= 600) {
    // Redémarre la scène
    this.scene.restart();
  }
}

function restartOnCollision(player, cible) {
  // Redémarre la scène
  this.scene.restart();
}