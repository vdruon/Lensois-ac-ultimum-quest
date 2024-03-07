// création et lancement du jeu à partir de la configuration config
var player;
var groupe_plateformes;
var clavier;
var boutonFeu ; // bouton pour tirer
var groupeBullets; // groupe de ballon pour gerer l'ensemble
var joueurTire=false;


export default class selection extends Phaser.Scene {
 
    constructor() {
       super({key : "selection"}); // mettre le meme nom que le nom de la classe
    }

    
    
    
  
  /***********************************************************************/
  /** FONCTION PRELOAD 
  /***********************************************************************/
  
  /** La fonction preload est appelée une et une seule fois,
   * lors du chargement de la scene dans le jeu.
   * On y trouve surtout le chargement des assets (images, son ..)
   */
   preload() {
   
    this.load.image("img_ciel", "src/assets/sky.png");
    this.load.image("img_plateforme", "src/assets/platform.png");
    
    this.load.spritesheet("img_perso", "src/assets/foot.png", {
      frameWidth: 58,
      frameHeight: 63,
    });

    this.load.spritesheet("img_perso2", "src/assets/foot2.png", {
      frameWidth: 58,
      frameHeight: 63,
    });
    
    this.load.image("img_etoile", "src/assets/star.png");
    this.load.image("img_bombe", "src/assets/bomb.png");
    this.load.image("img_gameover", "src/assets/fin.avif");
    this.load.image('img_porte1', 'src/assets/door1.png');
    this.load.image('img_porte2', 'src/assets/door2.png');
    this.load.image('img_porte3', 'src/assets/door3.png'); 
    this.load.image("bullet", "src/assets/ballon.png");
    this.load.image("accueil", "src/assets/Accueil2.png");
  }
  
  /***********************************************************************/
  /** FONCTION CREATE 
  /***********************************************************************/
  
  /* La fonction create est appelée lors du lancement de la scene
   * si on relance la scene, elle sera appelée a nouveau
   * on y trouve toutes les instructions permettant de créer la scene
   * placement des peronnages, des sprites, des platesformes, création des animations
   * ainsi que toutes les instructions permettant de planifier des evenements
   */
   create() {
  
    

    
    this.add.image("accueil");
    groupe_plateformes = this.physics.add.staticGroup();
    groupe_plateformes.create(200, 584, "img_plateforme");
    groupe_plateformes.create(600, 584, "img_plateforme"); 
    groupe_plateformes.create(50, 300, "img_plateforme");
    groupe_plateformes.create(600, 450, "img_plateforme");
    groupe_plateformes.create(750, 270, "img_plateforme");
    player = this.physics.add.sprite(100, 450, 'img_perso'); 
    player.setCollideWorldBounds(true);   
    this.physics.add.collider(player, groupe_plateformes);
    player.direction = 'right'; //direction du joueur
    groupeBullets = this.physics.add.group(); 
    
    clavier = this.input.keyboard.createCursorKeys();
    boutonFeu = this.input.keyboard.addKey('A'); // affectation de la touche A à boutonFeu
    this.porte1 = this.physics.add.staticSprite(600, 414, "img_porte1");
    this.porte2 = this.physics.add.staticSprite(50, 264, "img_porte2");
    this.porte3 = this.physics.add.staticSprite(750, 234, "img_porte3");
    this.porte4 = this.physics.add.staticSprite(600, 234, "img_porte3");
   
  
    // dans cette partie, on crée les animations, à partir des spritesheet
    // chaque animation est une succession de frame à vitesse de défilement défini
    // une animation doit avoir un nom. Quand on voudra la jouer sur un sprite, on utilisera la méthode play()
    // creation de l'animation "anim_tourne_gauche" qui sera jouée sur le player lorsque ce dernier tourne à gauche
    this.anims.create({
      key: "anim_tourne_gauche", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_perso", { start: 1, end: 3 }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 7, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    }); 
    
    this.anims.create({
      key: "anim_tourne_droite", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_perso2", { start: 1, end: 3 }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 7, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    }); 
    
    // creation de l'animation "anim_tourne_face" qui sera jouée sur le player lorsque ce dernier n'avance pas.
    this.anims.create({
      key: "anim_face",
      frames: [{ key: "img_perso", frame: 0 }],
      frameRate: 20,
      repeat: -1
    }); 

    this.anims.create({
      key: "anim_saute_droite",
      frames: [{ key: "img_perso2", frame: 8 }],
      frameRate: 1
    }); 

    this.anims.create({
      key: "anim_saute_gauche",
      frames: [{ key: "img_perso", frame: 8 }],
      frameRate: 1
    }); 

    this.anims.create({
      key: "anim_tire_droite",
      frames: [{ key: "img_perso2", frame: 9 }],
      frameRate: 1,
      repeat : -1
    }); 

    this.anims.create({
      key: "anim_tire_gauche",
      frames: [{ key: "img_perso", frame: 9 }],
      frameRate: 1,
      repeat : -1
    });



    player.setCollideWorldBounds(true);
      player.body.onWorldBounds = true; 

      player.body.world.on(
        "worldbounds", // evenement surveillé
        function (body, up, down, left, right) {
          // on verifie si la hitbox qui est rentrée en collision est celle du player,
          // et si la collision a eu lieu sur le bord inférieur du player
          if (body.gameObject === player && down == true) {
            // si oui : GAME OVER on arrete la physique et on colorie le personnage en rouge
            this.physics.pause();
            player.setTint(0xff0000);
          }
        },
        this
      ); 

    // instructions pour les objets surveillés en bord de monde
    this.physics.world.on("worldbounds", function(body) {
    // on récupère l'objet surveillé
    var objet = body.gameObject;
    // s'il s'agit d'une balle
    if (groupeBullets.contains(objet)) {
      // on le détruit
      objet.destroy();
    }
    });

     
    
      
  
   
  }
  
  /***********************************************************************/
  /** FONCTION UPDATE 
  /***********************************************************************/
  
   update() {
    
    if (clavier.right.isDown ) {
        player.setVelocityX(160);
        player.direction = 'right';
        if (joueurTire==false) {
          if( player.body.touching.down){
            player.anims.play("anim_tourne_droite", true);
          }
        }
    } else if ( clavier.left.isDown  ) {
        player.setVelocityX(-160);
        player.direction = 'left';
        if (joueurTire==false) {
          if( player.body.touching.down){
            player.anims.play("anim_tourne_gauche", true);
          }
        }
    } else {
      player.setVelocityX(0);
      if (joueurTire==false) {
        player.anims.play('anim_face');
      }
    } 
  
    if (clavier.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
   }

   if (!player.body.touching.down ) {
    if (clavier.right.isDown) {
      if (joueurTire==false) {
        player.anims.play("anim_saute_droite", true);
      }
      player.direction = 'right';
    } else if (clavier.left.isDown) {
      if (joueurTire==false) {
        player.anims.play("anim_saute_gauche", true);
      }
      player.direction = 'left';
    }
    } 
  
   
    if (Phaser.Input.Keyboard.JustDown(clavier.space) == true) {
      if (this.physics.overlap(player, this.porte1)) this.scene.start("niveau1");
      if (this.physics.overlap(player, this.porte2)) this.scene.start("niveau2");
      if (this.physics.overlap(player, this.porte3)) this.scene.start("niveau3");
     if (this.physics.overlap(player, this.porte4)) this.scene.start("niveau4");
   } 

   if ( Phaser.Input.Keyboard.JustDown(boutonFeu)) {
      joueurTire=true;
      tirer(player);
      if (player.direction=='right'){
        player.anims.play("anim_tire_droite", true);
      } else {
        player.anims.play("anim_tire_gauche", true);
      }
      setTimeout(function() {
        joueurTire=false
      }, 300);
    
      
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


