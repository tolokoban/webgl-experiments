"use strict";

/*
 *  Légende :
 *
 *  w: Mur
 *   : Vide
 *  .: Terre
 *  r: Pierre
 *  d: Diamant
 *  @: Monstre
 *
 *  E: Entrée
 *  X: Sortie
<<<<<<< HEAD
 */

window.Levels = function() {
  return [
    {
      // Nombre de diamants nécessaire pour ouvrir la sortie.
      need: 3,
      // Variation de la teinte pour chaque élément.
      tint: { wall: 120, rock: 80, diam: 180, dust: 330, expl: 0, mons: 0, void: 210 },
      rows: [
        "wwwwwwwwwwwwwwwww",
        "w......r..r.d...w",
        "wdr....E........w",
        "w....r..........w",
        "wwwwwww wwwwwwwww",
        "w...... ........w",
        "w...... r....X..w",
        "w....d. ......rrw",
        "w......@......rrw",
        "wwwwwwwwwwwwwwwww"
      ]
    },
    {
      // Nombre de diamants nécessaire pour ouvrir la sortie.
      need: 12,
=======
*/

window.Levels = function() {
  return [    
    /*
      // Nombre de diamants nécessaire pour ouvrir la sortie.
      need: 3,
      // Variation de la teinte pour chaque élément.
      tint: { wall: 0, rock: 0, diam: 0, dust: 0, exit: 0 },
      rows: [
        "wwwwwwwwwwwwwwwwwwww",
        "w.......r..r.d.....w",
        "w.dr....E..........w",
        "w.....r............w",
        "wwwwwwww wwwwwwwwwww",
        "w....... ..........w",
        "w....... r......X..w",
        "w.....d. ........rrw",
        "w.......@........rrw",
        "wwwwwwwwwwwwwwwwwwww"
      ]
    },*/
    {
      // Nombre de diamants nécessaire pour ouvrir la sortie.
      need: 12,
      // Variation de la teinte pour chaque élément.
      tint: { wall: 0, rock: 0, diam: 0, dust: 0, exit: 0 },
>>>>>>> 087a08f948b2fa3cb3efb25e138c5b93962066cd
      rows: [
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "w...... ..d.r .....r.r....... ....r....w",
        "w.rEr...... .........rd..r.... ..... ..w",
        "w.......... ..r.....r.r..r........r....w",
        "wr.rr.........r......r..r....r...r.....w",
        "wr. r......... r..r........r......r.rr.w",
        "w... ..r........r.....r. r........r.rr.w",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww...r..r.w",
        "w. ...r..d. ..r.r..........d.rd...... .w",
        "w..d.....r..... ........rr r..r....r...w",
        "w...r..r.r..............r .r..r........w",
        "w.r.....r........rrr.......r.. .d....r.w",
        "w.d.. ..r.  .....r.rd..d....r...r..d. .w",
        "w. r..............r r..r........d.....rw",
        "w........wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "w r.........r...d....r.....r...r.......w",
        "w r......... r..r........r......r.rr..Xw",
        "w. ..r........r.....r.  ....d...r.rr...w",
        "w....rd..r........r......r.rd......r...w",
        "w... ..r. ..r.rr.........r.rd...... ..rw",
        "w.d.... ..... ......... .r..r....r...r.w",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
      need: 11,
<<<<<<< HEAD
      tint: { wall: 280, rock: 280, diam: 45, dust: 280, expl: 0, mons: 0, void: 285 },
=======
>>>>>>> 087a08f948b2fa3cb3efb25e138c5b93962066cd
      rows: [
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "w.r..r..w.r...d.w... .r.wr......w..rr..w",
        "w.......w......rwrr. ...w ..d...w....r.w",
        "w                                      w",
        "wd......w.r....rw.r. .. w..r..d.w..r.r.w",
        "w.......w.r....rw.r. r..w.....r.w... ..w",
        "wwwwwwwwwwwwwwwwwwww wwwwwwwwwwwwwwwwwww",
        "w....rr.w..r....w... ..rw....r..w.....rw",
        "w.......w.. ....w... ...w....r. w.....rw",
        "w                                      w",
        "wr..r...w....r..w..r ...w......dwr.....w",
        "wr....r.w..r..r.w... . rw.......wr...r.w",
        "w.r.....w...r...w... . rw.......w r..r.w",
        "wwwwwwwwwwwwwwwwwwww wwwwwwwwwwwwwwwwwww",
        "wr.  @..w....r.rw... ...w.rd..r.w......w",
        "w.....r.wr......w..d ...w ..r...w.r.rr.w",
        "w                                      w",
        "wd.. .r.wr....r.w.r. ..rw.r.r...w......w",
        "w.....r.wr..d...w... r..w..r....w...rr w",
        "w.d... rw..r....w.Ed r..w. .....w...rr w",
        "w.r.... w.. ..r.w.X.r...w....r.rw.... .w",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
      need: 23,
<<<<<<< HEAD
      tint: { wall: 120, rock: 80, diam: 180, dust: 330, expl: 0, mons: 0, void: 210 },
=======
>>>>>>> 087a08f948b2fa3cb3efb25e138c5b93962066cd
      rows: [
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wr.ww.wrr.w...rwr..r....w...r.....rw.d.w",
        "w..Ew.d.r.w...www..w.r....r..r.r...w.wrw",
        "w....w..rd..r....w.....r.wwr.......w.www",
        "wd.w..wrwr..r....w...r......r.rr......ww",
        "wr.w...w..r.ww..r.wwd.......r.rr......ww",
        "wrr..r....w...r......r.rr......r..dww..w",
        "w..r.ww..r.rr...w....r.rr......w..r.w.rw",
        "w..w...d......d.r..wwr..r.w.wr..wr..d.rw",
        "wr.r....w.ww..d.r..wwr..r..d.w...w..r.ww",
        "w.r.ww.....rrwr..d.w.wr..wr...wr..d.r..w",
        "ww.ww......rrwr..r.w.ww...w..r.ww..r.www",
        "w.w.r.r.w...wwr..r....w...r.....ww.r.www",
        "w.w.r.r.w.d.w.wr..wr....r..r.rr....w...w",
        "ww..wrwr..r....w...d...w.rw......w.ww.dw",
        "ww...wwr..w.d...wr..r.r...r.wr......w..w",
        "ww.d....r.ww..r.wwr.......r.wr......w..w",
        "w..r....w...r......r.rr......w..r.w...ww",
        "wr.ww..r.ww...w....r.rr......w..rd..r..X",
        "ww...r......r.rd......r...ww..wr..d.w..w",
        "wrr...w.....r.rd......w..r.wd.d.rw.r...w",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
<<<<<<< HEAD
      need: 20,
      tint: { wall: 200, rock: 280, diam: 200, dust: 200, expl: 0, mons: 0, void: 200 },
=======
      need: 18,
>>>>>>> 087a08f948b2fa3cb3efb25e138c5b93962066cd
      rows: [
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wE.....r....................r........r.w",
        "w.....r..............r.................w",
        "w........r..r..........................w",
        "wr.....................................w",
        "w...................r..................w",
        "w.r.....................r.........r....w",
        "w..r.....r...........r..r.............rw",
        "w......r......r.....................r..w",
        "w........ @...r.. @...... @...... @....w",
        "w........  ...r..  ......  ......  .r..w",
        "w......................................w",
        "w...r..............................r...w",
        "w...r.....r............................w",
        "w......r...........r..................rw",
        "w...........r.......r..................w",
        "w..r..............r....................w",
        "w.....................r.........r......w",
        "w................................r..r..w",
        "w....r......r.rr..................r....w",
        "w...........r.rr.........r..r.r.......Xw",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
<<<<<<< HEAD
      need: 1,
      tint: { wall: 100, rock: 20, diam: 100, dust: 100, expl: 0, mons: 240, void: 100 },
      rows: [
        "wwwwwwwwwwwwwwwwwwww",
        "w                  w",
        "w         r        w",
        "w E       .        w",
        "w                 @w",
        "w                  w",
        "w                  w",
        "w                  w",
        "w                  w",
        "w                  w",
        "w                 Xw",
        "wwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
      need: 20,
      tint: { wall: 30, rock: 90, diam: 120, dust: 200, expl: 0, mons: 140, void: 300 },
=======
      need: 10,
      rows: [
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "w             b    wwwwwwwwwwwwwwwwwwwww",
        "w         r        wwwwwwwwwwwwwwwwwwwww",
        "w  E      .        wwwwwwwwwwwwwwwwwwwww",
        "w                  wwwwwwwwwwwwwwwwwwwww",
        "w                  wwwwwwwwwwwwwwwwwwwww",
        "w                  wwwwwwwwwwwwwwwwwwwww",
        "w                  wwwwwwwwwwwwwwwwwwwww",
        "w                  wwwwwwwwwwwwwwwwwwwww",
        "w                  wwwwwwwwwwwwwwwwwwwww",
        "w                 Xwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
      need: 10,
>>>>>>> 087a08f948b2fa3cb3efb25e138c5b93962066cd
      rows: [
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wE.....................................w",
        "w......................................w",
        "w......................................w",
        "w......................................w",
        "w......................................w",
        "w......................................w",
        "w......................................w",
        "w.......  @.....  @.....  @.....  @....w",
        "w.......   .....   .....   .....   ....w",
        "w....... d ..... d ..... d ..... d ....w",
        "w......................................w",
        "w......................................w",
        "w......................................w",
        "w.......  @.....  @.....  @.....  @....w",
        "w.......   .....   .....   .....   ....w",
        "w....... d ..... d ..... d ..... d ....w",
        "w......................................w",
        "w......................................w",
        "w......................................w",
        "w......................................X",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
      need: 10,
      rows: [
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwww....r.r..r........r.wwwwwwwwww",
        "ww        ...........r....r...        ww",
        "ww@d      ..r..........r...r..      d@ww",
        "wwwwwwwwww..r........r......r.wwwwwwwwww",
        "ww        ......r...r.......r.        ww",
        "ww@d      ....r......r.rr.....      d@ww",
        "wwwwwwwwww.rr........r.rr.....wwwwwwwwww",
        "ww        ....r.r....r..r.....        ww",
        "ww@d      ....r.r....r..r..r..      d@ww",
        "wwwwwwwwww.rr.r..r....r...r...wwwwwwwwww",
        "ww        .rr.r..r............        ww",
        "ww@d      ....r..r........r...      d@ww",
        "wwwwwwwwww.....r...r....r..r..wwwwwwwwww",
        "w....r.r..r........r.....r............rw",
        "w......r....r....r..r.r...r..r.........w",
        "w..r....r.....r...r.......r..r.........w",
        "w..r........r......r.rr.........r......w",
        "wr.E...r...........r.rr.........rr..r.Xw",
        "w....r......r.rr......r........r..r....w",
        "wrr.........r.rr.........r..r.r.r..r...w",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
      need: 10,
      rows: [
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "w. .. .rr..... ..r. E.... rr r..r. .  .w",
        "w ..r. .. .  .... .r.r. ...  r..r.d.. .w",
        "wr.....  .@.  ... .r.r. ... wwwwwwwwwwww",
        "w.r.d... .  ...... ..rr..r.... . ... . w",
        "wwwwwwwwwwwww.r. ..   r.. .... ...r....X",
        "wr. r...... ..r. ... ..r.  ..r.  @.....w",
        "wr. r...... .. r..r.... ...r......r.rr.w",
        "w... ..r  ... ..r.  ..r.  ... ....r.rr.w",
        "w... ..r. .r.... ...@......r.r..  r..r.w",
        "w  .. r.... ..r.r.... .  .......  d.. .w",
        "w. ... .. .  .. .  .....rr r..r. . r.. w",
        "w.. d..r.r.... .  ......r  r..r. .  ...w",
        "w.r.  ..r.  ... .r.r. ...  r.. .... ...w",
        "w....  .r.  ... .r.r. .r. . r.. r.... .w",
        "w.  .... ....  .. r r..r.... ...r... .rw",
        "w..... .  .rr. ...  r.. .r... r..r.r...w",
        "w r...... ..r. .r.... .  ..r.  r.......w",
        "w r...... .. r..r.... ...r......r.rr...w",
        "w. ..r. ... ..r.  .aa.  ... ....r.rr...w",
        "w. .dr@..r.... ...r......r.r@.....dr...w",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
      need: 10,
      rows: [
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "w . r.. . .. ..r. ..E ..r.  ..r. r... .w",
        "w.r.rr...... ..r...r.... ...r.....dr.r.w",
        "X r..r...  ...r..r. ..r.r...wwwwwwwwwwww",
        "w...d ..r. @.....r..... ........rr r..rw",
        "wwwwwwwwwwwww..r.r.... .  ......r  r..rw",
        "w.  ... ..r.  ..r.  .... rrr.....  r.. w",
        "w... r... @.. ..r.  .....r.rr..r. . r..w",
        "w..r. ..r. r.... ..... ...r r..r.... ..w",
        "w.....r ...... .  @rr. ...  r.. .r....rw",
        "wr.r... . r...... ..r...r....r....dr.  w",
        "w......r. r......... r..r...wwwwwwwwwwww",
        "w.rr...... ..r. ...d..r.  ..r.  ... r..w",
        "wwwwwwwwwwwwwr........ ...r......r.rr..w",
        "w..r...  ...d..r. ..r.rr.........r.rr..w",
        "w.. ..r. .r...@@@@@@@@.........  r..r..w",
        "wr.. r....r..r r...d .. .......  r..r..w",
        "w ... ..r. ...r.  .....rrrr..r. . r.. rw",
        "w. r..@.r.... .  ......rr r..r...  ...rw",
        "wr.  ..r.  .....r.r. ...  r..r.... ...rw",
        "w...  .r.r .....r.r.....   .. .r....r..w",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
      need: 10,
      rows: [
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wr@...............rwwwwwwwwwwwwwwwwwwwww",
        "wEr@.............rXwwwwwwwwwwwwwwwwwwwww",
        "wd.r@...........r.dwwwwwwwwwwwwwwwwwwwww",
        "wrd.r@.........r.drwwwwwwwwwwwwwwwwwwwww",
        "w.rd.r@.......r.dr.wwwwwwwwwwwwwwwwwwwww",
        "w..rd.r@.....r.dr..wwwwwwwwwwwwwwwwwwwww",
        "w...rd.r@...r.dr...wwwwwwwwwwwwwwwwwwwww",
        "w....rd.r@.r.dr....wwwwwwwwwwwwwwwwwwwww",
        "w.....rd.rr.dr.....wwwwwwwwwwwwwwwwwwwww",
        "w......rd..dr......wwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
      need: 10,
      rows: [
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wdddrrddrddr.rrrrdrdd.ddrddrddddrrdrdrrw",
        "wdrrdddrdddrdddrrrrrdrrd.drdrrrrdrddrrdw",
        "wddrrrrrdddrddrd.rrrdrrdddrdr.rrdrrrddrw",
        "wrrdrddrrdrrrddrddd..ddrrdrddrrdrdd.rrdw",
        "wrrdrddrrrrrrddrd.drdrrrrdrdrdrrddrrdrdw",
        "wdddrrdrd.ddrrddrrdddrrdrdrrr.drddrrdrdw",
        "wrrrrrdrrdddd..rrrdrdd.rdrddr.rrddddddrw",
        "wdrddwwwwwww.wwwwwdrrrrdrwwwwww.wwwwwwrw",
        "wd.ddw           wrddrrrdw           wrw",
        "wdrdrw EX        wrddrrrdw           wrw",
        "wdrrdw           wr.rrddrw           wrw",
        "wdrrdw           wddddrdrw           wdw",
        "wrdddw           wdrrd.drw           wdw",
        "wrrrrw           wdrrddrrw           wrw",
        "wdrddw           w.rdrrdrw           wrw",
        "wdrddw           wwwwwwwww           wrw",
        "wrrrdw                               wrw",
        "wrrrdw           wdd.rdrdw           wrw",
        "wddrrw           wrrrdrddw           wrw",
        "wdd..wwwwwwwwwwwwwdrrrdddwwwwwwwwwwwwwdw",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
      need: 10,
      rows: [
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "w............E.........................w",
        "wwwwwwwwwwwww wwwwwwww.................w",
        "ww....d.............dw.................w",
        "ww.w w.wwwwww wwwwww.w.................w",
        "ww.w@w.wd.........dw.w.................w",
        "ww.w@w.w.wwww wwww.w.w.................w",
        "ww.w@w.w.wd.....dw.w.w.................w",
        "ww.w@w.w.w.ww ww.w.w.w.................w",
        "ww.w@w w w w   w w w w.................w",
        "ww.w@w@w@w@w@@@w@w@w@w.................w",
        "ww.w@w w w w   w w w w.................w",
        "ww.w@w.w.w.wwwww.w.w.w.................w",
        "ww.w@w.w.wd.....dw.w.w.................w",
        "ww.wdw.w.wwwwwwwww.w.w.................w",
        "ww.wdw.wd.........dw.w.................w",
        "ww.wdw.wwwwwwwwwwwww.w.................w",
        "ww.wdwd.............dw.................w",
        "wwwwwwwwwwwwwwwwwwwwww.................w",
        "w......................................w",
        "w......................................X",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
      need: 10,
      rows: [
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wr.rd.rrr.w...drr..rw...d...r.w...dr.r.w",
        "w... .r.r.w...r r..rwr....r..rwr...r.rrw",
        "w.... ..rrw.r....r..w..r. rr..w....r.rrw",
        "wr.r.. rrrw.r.... ..wr......r.wr......rw",
        "wr. ...r..w.  ..r.rrw.......r.wr...... w",
        "wrr..r....w...r.....wr.rr.....wr..r r..w",
        "w..r.rr..rwrr...r...wr.rr.....wr..r. .ww",
        "w..r...r..w...r.r..rwr..r. .rrw. r..@wrw",
        "wr.r.wwwwwwwww@wwwwwwwwwrwwwwwwwww..w. w",
        "w.r.  .....rrrr..r.r.rr..rr... r..rwr..w",
        "wr.rr......rrrr..r. . r...r..r.rr.wr.rrw",
        "w. .r.r. w..rrr..r.... ...r.....rw.r.rrw",
        "w. .r.r. wr.wwwwwwwwwwwwwwwwwrr.w..r...w",
        "wr.. rrr.wr....r...r... .rr....w.r.rr.rw",
        "wr...rrr.wr.r... r..r.r...r.rrw.....r.Xw",
        "w .r....rw  ..r.rrr.......r.rw...... ..w",
        "w..r.... w..r......r.rr.....wr..r.r...rw",
        "wr.rr..r.wr...r....rErr......r..r@..r..w",
        "wr...r...w..r.r@......r... r.. r..rdr..w",
        "wrr.d. ..w..r.rr......r..r. r.@.rr.r...w",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
      need: 10,
      rows: [
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wr. ...rr.....r.r..r........r.....r..d.w",
        "w.....d.r....... ....r....r..r..... ..rw",
        "w.......rdw.r.w.. w...wr...r... @.. .. w",
        "wdwwwwwwwwwww.w...w..rw.....r..  ......w",
        "wr........w...w.r.w d.w.....r..........w",
        "wrr..r....w...w...w..rwrr......r..d....w",
        "w..r.....rwrr.w...w..rwrr.........r...rw",
        "w.wwwwwwwwwww.w.r.w .rw.r....r. @...d.rw",
        "wr.r......w...w.r.w..rw.r..d...  ...r..w",
        "w.r.......wrr w..dw.. w...r.......d.r..w",
        "w ........wrr w..rw...w... ..r.....r...w",
        "w.wwwwwwwwwwwwwwwrw...w...r........r.  w",
        "w...r.r...w...wr..wr..w.r..r.r. @......w",
        "w....r r..w...w...wd..w..r ....  .....dw",
        "w.... .r..w.d.w..rw.r.w...r. r.........w",
        "w.wwwwwwwwwww.w...w...w...r. r.........w",
        "w..r......w.r.w...wr.rw...... ..r......w",
        "wr.E...r. w...w...wr.rw.........rd..r..w",
        "w....r....w.r.wd..w...w.... ...r..d. ..X",
        "wrr.......w.r.wd..w...w..r..d.d.r..r...w",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
      need: 10,
      rows: [
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "w       E          wwwwwwwwwwwwwwwwwwwww",
        "w                  wwwwwwwwwwwwwwwwwwwww",
        "w                  wwwwwwwwwwwwwwwwwwwww",
        "w                  wwwwwwwwwwwwwwwwwwwww",
        "w                 Xwwwwwwwwwwwwwwwwwwwww",
        "w                  wwwwwwwwwwwwwwwwwwwww",
        "w              @@@@wwwwwwwwwwwwwwwwwwwww",
        "w              @@@@wwwwwwwwwwwwwwwwwwwww",
        "w              @@@@wwwwwwwwwwwwwwwwwwwww",
        "wdddddddddddddd@@@@wwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
      need: 10,
      rows: [
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wr.....rr.X.....r.Era.......r........r.w",
        "w.....r.r............r....r..r.r.......w",
        "w........r..r..............r...........w",
        "wr.......r...........r......r..r.......w",
        "wr........r.....r...r.......r..r.......w",
        "w.r..r........r......r.rr.........r....w",
        "w..r.....r...........r.rr.........r...rw",
        "w......r......r.r....r..r........r..r..w",
        "wr.r..........r.r..........r...........w",
        "w..........rr.r..r....r...r....r..r.r..w",
        "w..........r..r..r...........r.....r...w",
        "w...r.r.......r...........r........r...w",
        "w...r.r...r....r...r.......r...........w",
        "w....r.r..r........r.....r............rw",
        "w......r....r....r..r.r......r.........w",
        "w..r.wwwwwwwwwwwwwwwwwwwwwwwwwwwwww....w",
<<<<<<< HEAD
        "w..r.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@....w",
=======
        "w..r.bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb....w",
>>>>>>> 087a08f948b2fa3cb3efb25e138c5b93962066cd
        "wr...rrrrrrrrrrrrrrrrrrrrrrrrrrrrrr.r..w",
        "w......................................w",
        "w.r................................r...w",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
      need: 10,
      rows: [
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "w..E...................................w",
        "w......................................w",
        "w......................................w",
        "w......................................w",
        "w.....................@.@.@.@.@.@......w",
        "w.....................r.r.r.r.r.r......w",
        "w......................................w",
        "w......................................w",
<<<<<<< HEAD
        "w.........@. . . . . ..................w",
        "w......... . . . . . ..................w",
        "w......... .@. . . . ..................w",
        "w......... . . . . . ..................w",
        "w......... . .@. . . ..................w",
        "w......... . . . . . ..................w",
        "w......... . . .@. . ..................w",
        "w......... . . . . . ..................w",
        "w......... . . . .@. ..................X",
        "w......... . . . . . ..................w",
        "w......... . . . . .@..................w",
=======
        "w.........b. . . . . ..................w",
        "w......... . . . . . ..................w",
        "w......... .b. . . . ..................w",
        "w......... . . . . . ..................w",
        "w......... . .b. . . ..................w",
        "w......... . . . . . ..................w",
        "w......... . . .b. . ..................w",
        "w......... . . . . . ..................w",
        "w......... . . . .b. ..................X",
        "w......... . . . . . ..................w",
        "w......... . . . . .b..................w",
>>>>>>> 087a08f948b2fa3cb3efb25e138c5b93962066cd
        "w......................................w",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
      need: 10,
      rows: [
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wr.rr..  r..r..r.r..Er..r.rr..r.rr...r.w",
        "w.w.rr......r..r...r....w...r......r.r.w",
        "wrrw.r... r.. r..r.r..rwr.... .. ..r.r@w",
        "w...wr..r. @.....r. ..wr.  .....rrrr..rw",
        "w.rr.wrr... r..r.r...wr. r......rrrr..rw",
        "w. r..wr..r.r ..r.rrw... rrr. ...rrr..rw",
        "w...rr.w.@ ..r..r.rw.....r.rr..r.r.rr..w",
        "w..r.r..w.rr.... .w...r.. rrr..r....r..w",
        "w... .rr.w....r. w@rr. ...rrr..r.r... rw",
        "wr.r...r.rw.....wr..r. .r....r.  ..r.rrw",
        "w......r.rrw...w. ..rr..r.... ...r.....w",
        "w.rr......r....r...r..r.r ..r.rr... r..w",
        "w.rr......r.@@@..r....r...r......r.rr..w",
        "w..r... r...r..r.r..r.rr... .....r.rr..w",
        "w..r..r. .r....r.....r.  ......rrr..r. w",
        "wr.. r....r..r.r....r.  .......rrr..r..w",
        "wr...r..r.  ..r.  .... rrrr..r.r.rr..rrw",
        "w. r..@ r....r.rr......rrrr..r. .rr.. rw",
        "wr.rr..r.rr... .r.r. ...rrr..r.... ...rw",
        "w...rr.r.rr... .r.r.X...r r..r.r....r..w",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
      need: 10,
      rows: [
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wE..r..........r........r.....r..r.....w",
        "w.r.rr.........r...r........r......r.r.X",
        "w.r..r........r..r....r.r..........r.rrw",
        "w.......r..r.....r..............rr.r..rw",
        "w..r...r....r..r.r..............r..r..rw",
        "w.........r.....r........rrr.......r...w",
        "w....r....r.....r........r.rr..r....r..w",
        "w..r...@@@@@@..@@@@@@.....r.r..r.......w",
        "w.....rw....w..w..rrw.......r....r....rw",
        "wr.r...w..r.w..w....w...r....r.....r...w",
        "w......w..r.w..w....wr..r........r.....w",
        "w.rr...w....wr.w....w.r.....r.......r..w",
        "w.rr...w....wrrw.r..w.....r......r.rr..w",
        "w..r...w....w..w....w.rr.........r.rr..w",
        "w.....rwwwwww..wwwwww............r..r..w",
        "wr...r....r..r.r.................r..r..w",
        "w.............r........r.....r........rw",
        "w..r..r. @...... @.....r. @..r... @...rw",
        "wr.....r  ......  .......  ..r...  ...rw",
        "w......r.......................r....r..w",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
      need: 10,
      rows: [
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "w..E.......rrr......wwwwwwwwwwwwwwwwwwww",
        "w..........rrr......wwwwwwwwwwwwwwwwwwww",
        "w...................wwwwwwwwwwwwwwwwwwww",
        "w..........@@@......wwwwwwwwwwwwwwwwwwww",
        "w.......r..   ......wwwwwwwwwwwwwwwwwwww",
        "w........r.   ......wwwwwwwwwwwwwwwwwwww",
        "w.........r   ......wwwwwwwwwwwwwwwwwwww",
        "w........X.@@@......wwwwwwwwwwwwwwwwwwww",
        "w..........   ......wwwwwwwwwwwwwwwwwwww",
        "w..........   ......wwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
      ]}
  ];
}();
