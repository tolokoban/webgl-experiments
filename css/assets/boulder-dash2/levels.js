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
 */

window.Levels = function() {
  return [
    {
      // Nombre de diamants nécessaire pour ouvrir la sortie.
      need: 12,
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
      tint: { wall: 280, rock: 280, diam: 45, dust: 280, expl: 0, mons: 0, void: 285 },
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
      tint: { wall: 120, rock: 80, diam: 180, dust: 330, expl: 0, mons: 0, void: 210 },
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
      need: 20,
      tint: { wall: 200, rock: 280, diam: 200, dust: 240, expl: 0, mons: 60, void: 200 },
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
      need: 1,
      tint: { wall: 100, rock: 20, diam: 100, dust: 0, expl: 0, mons: 240, void: 100 },
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
      need: 70,
      tint: { wall: 30, rock: 90, diam: 120, dust: 300, expl: 0, mons: 140, void: 300 },
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
      need: 40,
      tint: { wall: 300, rock: 210, diam: 300, dust: 200, expl: 0, mons: 140, void: 300 },
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
      need: 13,
      tint: { wall: 30, rock: 10, diam: 80, dust: 100, expl: 0, mons: 300, void: 100 },
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
      need: 42,
      tint: { wall: 30, rock: 10, diam: 20, dust: 130, expl: 0, mons: 130, void: 160 },
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
      need: 16,
      tint: { wall: 180 , rock: 239 , diam: 45 , dust: 245 , expl: 320 , mons: 357 , void: 133 },
      rows: [
        "wwwwwwwwwwwwwwwwwwww",
        "wr@...............rw",
        "wEr@.............rXw",
        "wd.r@...........r.dw",
        "wrd.r@.........r.drw",
        "w.rd.r@.......r.dr.w",
        "w..rd.r@.....r.dr..w",
        "w...rd.r@...r.dr...w",
        "w....rd.r@.r.dr....w",
        "w.....rd.rr.dr.....w",
        "w......rd..dr......w",
        "wwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
      need: 50,
      tint: {wall: 26 , rock: 71 , diam: 264 , dust: 247 , expl: 56 , mons: 275 , void: 120},
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
      need: 16,
      tint: {wall: 33 , rock: 216 , diam: 73 , dust: 82 , expl: 92 , mons: 189 , void: 276},
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
        "wX.....................................w",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
      need: 6,
      tint: {wall: 161 , rock: 339 , diam: 235 , dust: 70 , expl: 140 , mons: 135 , void: 303},
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
      need: 22,
      tint: {wall: 99 , rock: 91 , diam: 112 , dust: 72 , expl: 71 , mons: 192 , void: 220},
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
      need: 14,
      tint: {wall: 166 , rock: 95 , diam: 98 , dust: 46 , expl: 293 , mons: 329 , void: 21},
      rows: [
        "wwwwwwwwwwwwwwwwwwww",
        "w       E          w",
        "w                  w",
        "w                  w",
        "w                  w",
        "w                 Xw",
        "w                  w",
        "w              @@@@w",
        "w              @@@@w",
        "w              @@@@w",
        "wdddddddddddddd@@@@w",
        "wwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
      need: 10,
      tint: {wall: 105 , rock: 55 , diam: 192 , dust: 74 , expl: 53 , mons: 142 , void: 169},
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
        "w..r.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@....w",
        "wr...rrrrrrrrrrrrrrrrrrrrrrrrrrrrrr.r..w",
        "w......................................w",
        "w.r................................r...w",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
      need: 50,
      tint: {wall: 165 , rock: 0 , diam: 252 , dust: 134 , expl: 113 , mons: 72 , void: 229},
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
        "w......................................w",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
      ]
    },
    {
      need: 32,
      tint: {wall: 0, rock: 320, diam: 35, dust: 300, expl: 113, mons: 202, void: 0},
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
      need: 30,
      tint: {wall: 100, rock: 120, diam: 235, dust: 20, expl: 313, mons: 102, void: 200},
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
      need: 18,
      tint: {wall: 320, rock: 70, diam: 70, dust: 70, expl: 70, mons: 70, void: 70},
      rows: [
        "wwwwwwwwwwwwwwwwwwwww",
        "w..E.......rrr......w",
        "w..........rrr......w",
        "w...................w",
        "w..........@@@......w",
        "w.......r..   ......w",
        "w........r.   ......w",
        "w.........r   ......w",
        "w........X.@@@......w",
        "w..........   ......w",
        "w..........   ......w",
        "wwwwwwwwwwwwwwwwwwwww"
      ]
    },
    //############################################################
    {
      // Nombre de diamants nécessaire pour ouvrir la sortie.
      need: 2,
      // Variation de la teinte pour chaque élément.
      tint: { wall: 120, rock: 80, diam: 180, dust: 330, expl: 0, mons: 0, void: 210 },
      rows: [
        "wwwwwww",
        "wEddXw",
        "wwwwwww"
      ]
    }
    
  ];
}();
