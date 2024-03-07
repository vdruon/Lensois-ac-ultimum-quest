
var clavier;
var boutonFeu; // bouton pour tirer
var groupeBullets; // groupe de ballon pour gerer l'ensemble
var joueurTire = false;
var cibles;



export default class niveau2 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau2" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }


  preload() {

    //charger Elchapo
    this.load.spritesheet("elchapo", "src/assets/MapJungle/pirate.png", {
      frameWidth: 105,
      frameHeight: 108,
    });
    this.load.image("porte", "src/assets/door2.png")

    // charger les tuiles de jeu
    this.load.image("fond1", "src/assets/MapJungle/fond-1.png");
    this.load.image("fond2", "src/assets/MapJungle/fond-2.png");
    this.load.image("fond3", "src/assets/MapJungle/fond-3.png");
    this.load.image("fond4", "src/assets/MapJungle/fond-4.png");
    this.load.image("fond5", "src/assets/MapJungle/fond-5.png");
    this.load.image("decor", "src/assets/MapJungle/decor.png");
    this.load.image("sol", "src/assets/MapJungle/sol.png");

    // chargement de la carte
    this.load.tilemapTiledJSON("carte", "src/assets/MapJungle/mapJungle.tmj");

  }

  create() {

    this.porte_retour = this.physics.add.staticSprite(3175, 350, "porte");

    //gerer les elchapo
    cibles = this.physics.add.group();
    var e1 = cibles.create(300, 200, "elchapo");
    e1.setScale(0.5);
    var e2 = cibles.create(500, 200, "elchapo");
    e2.setScale(0.5);
    var e3 = cibles.create(600, 50, "elchapo");
    e3.setScale(0.5);
    var e4 = cibles.create(250, 50, "elchapo");
    e4.setScale(0.5);
    var e5 = cibles.create(775, 100, "elchapo");
    e5.setScale(0.5);
    var e6 = cibles.create(705, 300, "elchapo");
    e6.setScale(0.3);
    var e7 = cibles.create(850, 300, "elchapo");
    e7.setScale(0.3);
    var e8 = cibles.create(1325, 50, "elchapo");
    e8.setScale(0.3);
    var e9 = cibles.create(1300, 300, "elchapo");
    e9.setScale(0.3);
    var e10 = cibles.create(1190, 400, "elchapo");
    e10.setScale(0.3);
    var e11 = cibles.create(1600, 400, "elchapo");
    e11.setScale(0.3);
    var e12 = cibles.create(1750, 400, "elchapo");
    e12.setScale(0.3);
    var e13 = cibles.create(1950, 400, "elchapo");
    e13.setScale(0.3);
    var e14 = cibles.create(1825, 50, "elchapo");
    e14.setScale(0.3);
    var e15 = cibles.create(2025, 50, "elchapo");
    e15.setScale(0.3);
    var e16 = cibles.create(2200, 400, "elchapo");
    e16.setScale(0.3);
    var e17 = cibles.create(2275, 50, "elchapo");
    e17.setScale(0.3);
    var e18 = cibles.create(2350, 400, "elchapo");
    e18.setScale(0.3);
    var e19 = cibles.create(2600, 10, "elchapo");
    e19.setScale(0.3);
    var e20 = cibles.create(2600, 400, "elchapo");
    e20.setScale(0.3);
    var e21 = cibles.create(2680, 10, "elchapo");
    e21.setScale(0.3);
    var e22 = cibles.create(2600, 400, "elchapo");
    e22.setScale(0.3);
    var e22 = cibles.create(2680, 400, "elchapo");
    e22.setScale(0.3);
    var e23 = cibles.create(2800, 400, "elchapo");
    e23.setScale(0.3);
    var e24 = cibles.create(2850, 25, "elchapo");
    e24.setScale(0.3);
    var e25 = cibles.create(3080, 25, "elchapo");
    e25.setScale(0.3);
    var e26 = cibles.create(3150, 25, "elchapo");



    this.player = this.physics.add.sprite(50, 200, "img_perso");
    this.player.scale = 0.50;
    this.player.refreshBody();
    this.player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    boutonFeu = this.input.keyboard.addKey('A'); // affectation de la touche A à boutonFeu
    this.player.direction = 'right'; //direction du joueur
    groupeBullets = this.physics.add.group();
    this.player.body.onWorldBounds = true;

    // on met en place l'écouteur sur les bornes du monde
    this.player.body.world.on(
      "worldbounds", // evenement surveillé
      function (body, up, down, left, right) {
        // on verifie si la hitbox qui est rentrée en collision est celle du player,
        // et si la collision a eu lieu sur le bord inférieur du player
        if (body.gameObject === this.player && down == true) {
          this.scene.restart();
        }


      }, this)



    // ajout d'un texte distintcif  du niveau
    this.add.text(400, 100, "Vous êtes dans le niveau 2", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });

    //this.porte_retour = this.physics.add.staticSprite(100, 550, "img_porte2");




    // chargement de la carte
    const carteJungle = this.add.tilemap("carte");

    // chargement du jeu de tuiles
    const fond1 = carteJungle.addTilesetImage(
      "fond1",
      "fond1"
    );

    const fond2 = carteJungle.addTilesetImage(
      "fond2",
      "fond2"
    );

    const fond3 = carteJungle.addTilesetImage(
      "fond3",
      "fond3"
    );

    const fond4 = carteJungle.addTilesetImage(
      "fond4",
      "fond4"
    );

    const fond5 = carteJungle.addTilesetImage(
      "fond5",
      "fond5"
    );

    const fonddecor = carteJungle.addTilesetImage(
      "decor",
      "decor"
    );

    const sol = carteJungle.addTilesetImage(
      "sol",
      "sol"
    );

    // chargement du calque 
    const calque_1 = carteJungle.createLayer(
      "fond1",
      fond1
    );

    const calque_2 = carteJungle.createLayer(
      "fond2",
      fond2
    );

    const calque_3 = carteJungle.createLayer(
      "fond3",
      fond3
    );

    const calque_4 = carteJungle.createLayer(
      "fond4",
      fond4
    );

    const calque_5 = carteJungle.createLayer(
      "fond5",
      fond5
    );

    const calque_decor = carteJungle.createLayer(
      "decor",
      fonddecor
    );

    const calque_sol = carteJungle.createLayer(
      "sol",
      sol
    );

    // définition des tuiles de plateformes qui sont solides
    // utilisation de la propriété estSolide
    calque_sol.setCollisionByProperty({ estSolide: true });

    this.physics.add.collider(this.player, calque_sol);
    this.physics.add.collider(cibles, calque_sol);
    this.physics.add.overlap(this.player, cibles, restart, null, this);

    this.physics.add.collider(groupeBullets, calque_sol, function (bullet, platform) {
      bullet.destroy(); // Détruisez la balle lorsqu'elle entre en collision avec une plateforme
    });

    this.physics.add.collider(groupeBullets, cibles, function (bullet, cibles) {
      bullet.destroy(); // Détruisez la balle lorsqu'elle entre en collision avec un abdellah
      cibles.destroy();
    });


    // redimentionnement du monde avec les dimensions calculées via tiled
    this.physics.world.setBounds(0, 0, 3200, 640);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 3200, 640);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(this.player);


    this.player.setDepth(2);
    cibles.setDepth(1);
    this.porte_retour.setDepth(1);
    this.player.setCollideWorldBounds(true);

    // instructions pour les objets surveillés en bord de monde
    this.physics.world.on("worldbounds", function (body) {
      // on récupère l'objet surveillé
      var objet = body.gameObject;
      // s'il s'agit d'une balle
      if (groupeBullets.contains(objet)) {
        // on le détruit
        objet.destroy();
      }
    });
  }



  update() {

    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        this.scene.switch("selection");
        }
    } 

    if (this.clavier.right.isDown) {
      this.player.setVelocityX(100);
      this.player.direction = 'right';
      if (joueurTire == false) {
        if (this.player.body.blocked.down) {
          this.player.anims.play("anim_tourne_droite", true);
        }
      }
    } else if (this.clavier.left.isDown) {
      this.player.setVelocityX(-100);
      this.player.direction = 'left';
      if (joueurTire == false) {
        if (this.player.body.blocked.down) {
          this.player.anims.play("anim_tourne_gauche", true);
        }
      }
    } else {
      this.player.setVelocityX(0);
      if (joueurTire == false) {
        this.player.anims.play('anim_face');
      }
    }

    if (this.clavier.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-225);
    }

    if (!this.player.body.blocked.down) {
      if (this.clavier.right.isDown) {
        if (joueurTire == false) {
          this.player.anims.play("anim_saute_droite", true);
        }
        this.player.direction = 'right';
      } else if (this.clavier.left.isDown) {
        if (joueurTire == false) {
          this.player.anims.play("anim_saute_gauche", true);
        }
        this.player.direction = 'left';
      }
    }

    if (Phaser.Input.Keyboard.JustDown(boutonFeu)) {
      joueurTire = true;
      tirer(this.player);
      if (this.player.direction == 'right') {
        this.player.anims.play("anim_tire_droite", true);
      } else {
        this.player.anims.play("anim_tire_gauche", true);
      }
      setTimeout(function () {
        joueurTire = false
      }, 300);

    }

    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        console.log("niveau 3 : retour vers selection");
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
  var bullet = groupeBullets.create(player.x + (25 * coefDir), player.y + 10, 'bullet');
  // parametres physiques de la balle.
  bullet.setCollideWorldBounds(true);
  bullet.body.onWorldBounds = true;
  bullet.body.allowGravity = false;
  bullet.setVelocity(1000 * coefDir, 0); // vitesse en x et en y
}

// fonction déclenchée lorsque une balle et une cible (murs ou monstres) se superposent

function restart() {
  console.log("restart to dox")
  // Replacer objet1 à la position (x, y)
  this.scene.restart();
}

