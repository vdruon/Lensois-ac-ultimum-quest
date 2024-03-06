
var player;



export default class niveau2 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau2" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }


  preload() {
    // charger les tuiles de jeu
    this.load.image("fond1", "src/assets/map jungle/fond jungle/plx-1.png");
    this.load.image("fond2", "src/assets/map jungle/fond jungle/plx-2.png");
    this.load.image("fond3", "src/assets/map jungle/fond jungle/plx-3.png");
    this.load.image("fond4", "src/assets/map jungle/fond jungle/plx-4.png");
    this.load.image("fond5", "src/assets/map jungle/fond jungle/plx-5.png");
    this.load.image("fonddecor", "src/assets/map jungle/fond jungle/maison jungle.png");
    this.load.image("sol", "src/assets/map jungle/fond jungle/jungle tileset.png");

    // chargement de la carte
    this.load.tilemapTiledJSON("carte", "src/assets/map jungle/fond jungle/map jungle.tmj");

  }

  create() {
    // ajout d'un texte distintcif  du niveau
    this.add.text(400, 100, "Vous êtes dans le niveau 2", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });

    //this.porte_retour = this.physics.add.staticSprite(100, 550, "img_porte2");

    this.player = this.physics.add.sprite(100, 450, "img_perso");
    this.player.refreshBody();
    //this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, this.groupe_plateformes);


    // chargement de la carte
    const carteJungle = this.add.tilemap("carte");

    // chargement du jeu de tuiles
    const fond1 = carteJungle.addTilesetImage(
      "fond 1",
      "fond1"
    );

    const fond2 = carteJungle.addTilesetImage(
      "fond 2",
      "fond2"
    );

    const fond3 = carteJungle.addTilesetImage(
      "fond 3",
      "fond3"
    );

    const fond4 = carteJungle.addTilesetImage(
      "fond 4",
      "fond4"
    );

    const fond5 = carteJungle.addTilesetImage(
      "fond 5",
      "fond5"
    );

    const fonddecor = carteJungle.addTilesetImage(
      "fond decor",
      "fonddecor"
    );

    const sol = carteJungle.addTilesetImage(
      "sol",
      "sol"
    );

    // chargement du calque calque_background
    const calque_1 = carteJungle.createLayer(
      "fond 1",
      fond1
    );

    const calque_2 = carteJungle.createLayer(
      "fond 2",
      fond2
    );

    const calque_3 = carteJungle.createLayer(
      "fond 3",
      fond3
    );

    const calque_4 = carteJungle.createLayer(
      "fond 4",
      fond4
    );

    const calque_5 = carteJungle.createLayer(
      "fond 5",
      fond5
    );

    const calque_decor = carteJungle.createLayer(
      "fond decor",
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

    // redimentionnement du monde avec les dimensions calculées via tiled
    this.physics.world.setBounds(0, -200, 3200, 640);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, -200, 1600, 320);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(this.player);  




  }

  update() {
    if (this.clavier.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("anim_tourne_gauche", true);
    } else if (this.clavier.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("anim_tourne_droite", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("anim_face");
    }
    if (this.clavier.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-400);
    }

    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        console.log("niveau 3 : retour vers selection");
        this.scene.switch("selection");
      }
    }
  }
}
