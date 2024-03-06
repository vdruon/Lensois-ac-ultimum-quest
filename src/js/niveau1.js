import * as fct from "/src/js/fonctions.js";

var player;
var boutonFeu;
var groupeBullets; 


export default class niveau1 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau1" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {

    this.load.image("Phaser_tuilesbateau", "src/assets/map vikings/bateau viking.png");
    this.load.image("Phaser_tuilesciel", "src/assets/map vikings/ciel vikings.png");
    this.load.image("Phaser_tuilesplateforme", "src/assets/map vikings/plateforme viking.png");
    this.load.image("Phaser_tuilesprops", "src/assets/map vikings/props vikings.png");
    
    this.load.tilemapTiledJSON("carte", "src/assets/map vikings/map vikings.tmj");

    this.load.image("bullet", "src/assets/ballon.png");




    

  }

  create() {

    this.player = this.physics.add.sprite(100, 100, "img_perso");
    this.player.setDepth(1);
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, this.groupe_plateformes);

    this.player.direction = 'right';  
    groupeBullets = this.physics.add.group();




// affectation de la touche A à boutonFeu
boutonFeu = this.input.keyboard.addKey('A'); 



   
  // chargement de la carte
const carteDuNiveau = this.add.tilemap("carte");

// chargement du jeu de tuiles

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

// chargement du calque calque_background
const TileLayer_1 = carteDuNiveau.createLayer(
          "TileLayer1",
          [tileset , tileset3]
        );

// chargement du calque calque_background_2
const TileLayer_2  = carteDuNiveau.createLayer(
          "TileLayer2",
          tileset2
        );

// chargement du calque calque_plateformes
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



// redimentionnement du monde avec les dimensions calculées via tiled
this.physics.world.setBounds(0, 0, 3200, 640);
//  ajout du champs de la caméra de taille identique à celle du monde
this.cameras.main.setBounds(0, 0, 3200, 640);
// ancrage de la caméra sur le joueur
this.cameras.main.startFollow(this.player);  

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

    if ( Phaser.Input.Keyboard.JustDown(boutonFeu)) {
      tirer(player);
   }  
 

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