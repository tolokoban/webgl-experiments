"use strict";

/*
Légende :

w: Mur
_: Vide
.: Terre
r: Pierre
d: Diamant
f: Ennemi 1

E: Entrée
X: Sortie

 */

window.Caves = function() {
  return [
    [
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      "w......_..d.r_.....r.r......._....r....w",
      "w.rEr......_.........rd..r...._....._..w",
      "w.........._..r.....r.r..r........r....w",
      "wr.rr.........r......r..r....r...r.....w",
      "wr._r........._r..r........r......r.rr.w",
      "w..._..r........r.....r._r........r.rr.w",
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww...r..r.w",
      "w._...r..d._..r.r..........d.rd......_.w",
      "w..d.....r....._........rr_r..r....r...w",
      "w...r..r.r..............r_.r..r........w",
      "w.r.....r........rrr.......r.._.d....r.w",
      "w.d.._..r.__.....r.rd..d....r...r..d._.w",
      "w._r..............r_r..r........d.....rw",
      "w........wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      "w_r.........r...d....r.....r...r.......w",
      "w_r........._r..r........r......r.rr..Xw",
      "w._..r........r.....r.__....d...r.rr...w",
      "w....rd..r........r......r.rd......r...w",
      "w..._..r._..r.rr.........r.rd......_..rw",
      "w.d...._....._........._.r..r....r...r.w",
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
    ], [
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      "w.r..r..w.r...d.w..._.r.wr......w..rr..w",
      "w.......w......rwrr._...w_..d...w....r.w",
      "w______________________________________w",
      "wd......w.r....rw.r._.._w..r..d.w..r.r.w",
      "w.......w.r....rw.r._r..w.....r.w..._..w",
      "wwwwwwwwwwwwwwwwwwww_wwwwwwwwwwwwwwwwwww",
      "w....rr.w..r....w..._..rw....r..w.....rw",
      "w.......w.._....w..._...w....r._w.....rw",
      "w______________________________________w",
      "wr..r...w....r..w..r_...w......dwr.....w",
      "wr....r.w..r..r.w..._._rw.......wr...r.w",
      "w.r.....w...r...w..._._rw.......w_r..r.w",
      "wwwwwwwwwwwwwwwwwwww_wwwwwwwwwwwwwwwwwww",
      "wr.__f..w....r.rw..._...w.rd..r.w......w",
      "w.....r.wr......w..d_...w_..r...w.r.rr.w",
      "w______________________________________w",
      "wd.._.r.wr....r.w.r._..rw.r.r...w......w",
      "w.....r.wr..d...w..._r..w..r....w...rr_w",
      "w.d..._rw..r....w.Ed_r..w._.....w...rr_w",
      "w.r...._w.._..r.w.X.r...w....r.rw...._.w",
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
    ], [
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
    ], [
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      "wE.....r....................r........r.w",
      "w.....r..............r.................w",
      "w........r..r..........................w",
      "wr.....................................w",
      "w...................r..................w",
      "w.r.....................r.........r....w",
      "w..r.....r...........r..r.............rw",
      "w......r......r.....................r..w",
      "w........_b...r.._b......_b......_b....w",
      "w........__...r..__......__......__.r..w",
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
    ], [
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      "w_____________b____wwwwwwwwwwwwwwwwwwwww",
      "w_________r________wwwwwwwwwwwwwwwwwwwww",
      "w__E______.________wwwwwwwwwwwwwwwwwwwww",
      "w__________________wwwwwwwwwwwwwwwwwwwww",
      "w__________________wwwwwwwwwwwwwwwwwwwww",
      "w__________________wwwwwwwwwwwwwwwwwwwww",
      "w__________________wwwwwwwwwwwwwwwwwwwww",
      "w__________________wwwwwwwwwwwwwwwwwwwww",
      "w__________________wwwwwwwwwwwwwwwwwwwww",
      "w_________________Xwwwwwwwwwwwwwwwwwwwww",
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
    ], [
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      "wE.....................................w",
      "w......................................w",
      "w......................................w",
      "w......................................w",
      "w......................................w",
      "w......................................w",
      "w......................................w",
      "w.......__f.....__f.....__f.....__f....w",
      "w.......___.....___.....___.....___....w",
      "w......._d_....._d_....._d_....._d_....w",
      "w......................................w",
      "w......................................w",
      "w......................................w",
      "w.......__f.....__f.....__f.....__f....w",
      "w.......___.....___.....___.....___....w",
      "w......._d_....._d_....._d_....._d_....w",
      "w......................................w",
      "w......................................w",
      "w......................................w",
      "w......................................X",
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
    ], [
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwww....r.r..r........r.wwwwwwwwww",
      "ww________...........r....r...________ww",
      "wwfd______..r..........r...r..______dfww",
      "wwwwwwwwww..r........r......r.wwwwwwwwww",
      "ww________......r...r.......r.________ww",
      "wwfd______....r......r.rr.....______dfww",
      "wwwwwwwwww.rr........r.rr.....wwwwwwwwww",
      "ww________....r.r....r..r.....________ww",
      "wwfd______....r.r....r..r..r..______dfww",
      "wwwwwwwwww.rr.r..r....r...r...wwwwwwwwww",
      "ww________.rr.r..r............________ww",
      "wwfd______....r..r........r...______dfww",
      "wwwwwwwwww.....r...r....r..r..wwwwwwwwww",
      "w....r.r..r........r.....r............rw",
      "w......r....r....r..r.r...r..r.........w",
      "w..r....r.....r...r.......r..r.........w",
      "w..r........r......r.rr.........r......w",
      "wr.E...r...........r.rr.........rr..r.Xw",
      "w....r......r.rr......r........r..r....w",
      "wrr.........r.rr.........r..r.r.r..r...w",
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
    ], [
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      "w._.._.rr....._..r._E...._rr_r..r._.__.w",
      "w_..r._.._.__...._.r.r._...__r..r.d.._.w",
      "wr.....__.f.__..._.r.r._..._wwwwwwwwwwww",
      "w.r.d..._.__......_..rr..r...._._..._._w",
      "wwwwwwwwwwwww.r._..___r.._...._...r....X",
      "wr._r......_..r._..._..r.__..r.__f.....w",
      "wr._r......_.._r..r...._...r......r.rr.w",
      "w..._..r__..._..r.__..r.__..._....r.rr.w",
      "w..._..r._.r...._...f......r.r..__r..r.w",
      "w__.._r...._..r.r...._.__.......__d.._.w",
      "w._..._.._.__.._.__.....rr_r..r._._r.._w",
      "w.._d..r.r...._.__......r__r..r._.__...w",
      "w.r.__..r.__..._.r.r._...__r.._...._...w",
      "w....__.r.__..._.r.r._.r._._r.._r...._.w",
      "w.__...._....__.._r_r..r...._...r..._.rw",
      "w....._.__.rr._...__r.._.r..._r..r.r...w",
      "w_r......_..r._.r...._.__..r.__r.......w",
      "w_r......_.._r..r...._...r......r.rr...w",
      "w._..r._..._..r.__.aa.__..._....r.rr...w",
      "w._.drf..r...._...r......r.rf.....dr...w",
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
    ], [
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      "w_._r.._._.._..r._..E_..r.__..r._r..._.w",
      "w.r.rr......_..r...r...._...r.....dr.r.w",
      "X_r..r...__...r..r._..r.r...wwwwwwwwwwww",
      "w...d_..r._f.....r....._........rr_r..rw",
      "wwwwwwwwwwwww..r.r...._.__......r__r..rw",
      "w.__..._..r.__..r.__...._rrr.....__r.._w",
      "w..._r..._f.._..r.__.....r.rr..r._._r..w",
      "w..r._..r._r...._....._...r_r..r...._..w",
      "w.....r_......_.__frr._...__r.._.r....rw",
      "wr.r..._._r......_..r...r....r....dr.__w",
      "w......r._r........._r..r...wwwwwwwwwwww",
      "w.rr......_..r._...d..r.__..r.__..._r..w",
      "wwwwwwwwwwwwwr........_...r......r.rr..w",
      "w..r...__...d..r._..r.rr.........r.rr..w",
      "w.._..r._.r...mmmmmmmm.........__r..r..w",
      "wr.._r....r..r_r...d_.._.......__r..r..w",
      "w_..._..r._...r.__.....rrrr..r._._r.._rw",
      "w._r..f.r...._.__......rr_r..r...__...rw",
      "wr.__..r.__.....r.r._...__r..r...._...rw",
      "w...__.r.r_.....r.r.....___.._.r....r..w",
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
    ], [
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      "wrf...............rwwwwwwwwwwwwwwwwwwwww",
      "wErf.............rXwwwwwwwwwwwwwwwwwwwww",
      "wd.rf...........r.dwwwwwwwwwwwwwwwwwwwww",
      "wrd.rf.........r.drwwwwwwwwwwwwwwwwwwwww",
      "w.rd.rf.......r.dr.wwwwwwwwwwwwwwwwwwwww",
      "w..rd.rf.....r.dr..wwwwwwwwwwwwwwwwwwwww",
      "w...rd.rf...r.dr...wwwwwwwwwwwwwwwwwwwww",
      "w....rd.rf.r.dr....wwwwwwwwwwwwwwwwwwwww",
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
    ], [
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      "wdddrrddrddr.rrrrdrdd.ddrddrddddrrdrdrrw",
      "wdrrdddrdddrdddrrrrrdrrd.drdrrrrdrddrrdw",
      "wddrrrrrdddrddrd.rrrdrrdddrdr.rrdrrrddrw",
      "wrrdrddrrdrrrddrddd..ddrrdrddrrdrdd.rrdw",
      "wrrdrddrrrrrrddrd.drdrrrrdrdrdrrddrrdrdw",
      "wdddrrdrd.ddrrddrrdddrrdrdrrr.drddrrdrdw",
      "wrrrrrdrrdddd..rrrdrdd.rdrddr.rrddddddrw",
      "wdrddwwwwwww.wwwwwdrrrrdrwwwwww.wwwwwwrw",
      "wd.ddw___________wrddrrrdw___________wrw",
      "wdrdrw_EX________wrddrrrdw___________wrw",
      "wdrrdw___________wr.rrddrw___________wrw",
      "wdrrdw___________wddddrdrw___________wdw",
      "wrdddw___________wdrrd.drw___________wdw",
      "wrrrrw___________wdrrddrrw___________wrw",
      "wdrddw___________w.rdrrdrw___________wrw",
      "wdrddw___________wwwwwwwww___________wrw",
      "wrrrdw_______________________________wrw",
      "wrrrdw___________wdd.rdrdw___________wrw",
      "wddrrw___________wrrrdrddw___________wrw",
      "wdd..wwwwwwwwwwwwwdrrrdddwwwwwwwwwwwwwdw",
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
    ], [
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      "w............E.........................w",
      "wwwwwwwwwwwww_wwwwwwww.................w",
      "ww....d.............dw.................w",
      "ww.w_w.wwwwww_wwwwww.w.................w",
      "ww.wfw.wd.........dw.w.................w",
      "ww.wfw.w.wwww_wwww.w.w.................w",
      "ww.wfw.w.wd.....dw.w.w.................w",
      "ww.wfw.w.w.ww_ww.w.w.w.................w",
      "ww.wfw_w_w_w___w_w_w_w.................w",
      "ww.wfwfwfwfwfffwfwfwfw.................w",
      "ww.wfw_w_w_w___w_w_w_w.................w",
      "ww.wfw.w.w.wwwww.w.w.w.................w",
      "ww.wfw.w.wd.....dw.w.w.................w",
      "ww.wdw.w.wwwwwwwww.w.w.................w",
      "ww.wdw.wd.........dw.w.................w",
      "ww.wdw.wwwwwwwwwwwww.w.................w",
      "ww.wdwd.............dw.................w",
      "wwwwwwwwwwwwwwwwwwwwww.................w",
      "w......................................w",
      "w......................................X",
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
    ], [
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      "wr.rd.rrr.w...drr..rw...d...r.w...dr.r.w",
      "w..._.r.r.w...r_r..rwr....r..rwr...r.rrw",
      "w...._..rrw.r....r..w..r._rr..w....r.rrw",
      "wr.r.._rrrw.r...._..wr......r.wr......rw",
      "wr._...r..w.__..r.rrw.......r.wr......_w",
      "wrr..r....w...r.....wr.rr.....wr..r_r..w",
      "w..r.rr..rwrr...r...wr.rr.....wr..r._.ww",
      "w..r...r..w...r.r..rwr..r._.rrw._r..fwrw",
      "wr.r.wwwwwwwwwfwwwwwwwwwrwwwwwwwww..w._w",
      "w.r.__.....rrrr..r.r.rr..rr..._r..rwr..w",
      "wr.rr......rrrr..r._._r...r..r.rr.wr.rrw",
      "w._.r.r._w..rrr..r...._...r.....rw.r.rrw",
      "w._.r.r._wr.wwwwwwwwwwwwwwwwwrr.w..r...w",
      "wr.._rrr.wr....r...r..._.rr....w.r.rr.rw",
      "wr...rrr.wr.r..._r..r.r...r.rrw.....r.Xw",
      "w_.r....rw__..r.rrr.......r.rw......_..w",
      "w..r...._w..r......r.rr.....wr..r.r...rw",
      "wr.rr..r.wr...r....rErr......r..rf..r..w",
      "wr...r...w..r.rf......r..._r.._r..rdr..w",
      "wrr.d._..w..r.rr......r..r._r.f.rr.r...w",
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
    ], [
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      "wr._...rr.....r.r..r........r.....r..d.w",
      "w.....d.r......._....r....r..r....._..rw",
      "w.......rdw.r.w.._w...wr...r..._f.._.._w",
      "wdwwwwwwwwwww.w...w..rw.....r..__......w",
      "wr........w...w.r.w_d.w.....r..........w",
      "wrr..r....w...w...w..rwrr......r..d....w",
      "w..r.....rwrr.w...w..rwrr.........r...rw",
      "w.wwwwwwwwwww.w.r.w_.rw.r....r._f...d.rw",
      "wr.r......w...w.r.w..rw.r..d...__...r..w",
      "w.r.......wrr_w..dw.._w...r.......d.r..w",
      "w_........wrr_w..rw...w..._..r.....r...w",
      "w.wwwwwwwwwwwwwwwrw...w...r........r.__w",
      "w...r.r...w...wr..wr..w.r..r.r._f......w",
      "w....r_r..w...w...wd..w..r_....__.....dw",
      "w...._.r..w.d.w..rw.r.w...r._r.........w",
      "w.wwwwwwwwwww.w...w...w...r._r.........w",
      "w..r......w.r.w...wr.rw......_..r......w",
      "wr.E...r._w...w...wr.rw.........rd..r..w",
      "w....r....w.r.wd..w...w...._...r..d._..X",
      "wrr.......w.r.wd..w...w..r..d.d.r..r...w",
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
    ], [
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      "w_______E__________wwwwwwwwwwwwwwwwwwwww",
      "w__________________wwwwwwwwwwwwwwwwwwwww",
      "w__________________wwwwwwwwwwwwwwwwwwwww",
      "w__________________wwwwwwwwwwwwwwwwwwwww",
      "w_________________Xwwwwwwwwwwwwwwwwwwwww",
      "w__________________wwwwwwwwwwwwwwwwwwwww",
      "w______________ffffwwwwwwwwwwwwwwwwwwwww",
      "w______________ffffwwwwwwwwwwwwwwwwwwwww",
      "w______________ffffwwwwwwwwwwwwwwwwwwwww",
      "wddddddddddddddffffwwwwwwwwwwwwwwwwwwwww",
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
    ], [
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
      "w..r.bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb....w",
      "wr...rrrrrrrrrrrrrrrrrrrrrrrrrrrrrr.r..w",
      "w......................................w",
      "w.r................................r...w",
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
    ], [
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      "w..E...................................w",
      "w......................................w",
      "w......................................w",
      "w......................................w",
      "w.....................f.f.f.f.f.f......w",
      "w.....................r.r.r.r.r.r......w",
      "w......................................w",
      "w......................................w",
      "w.........b._._._._._..................w",
      "w........._._._._._._..................w",
      "w........._.b._._._._..................w",
      "w........._._._._._._..................w",
      "w........._._.b._._._..................w",
      "w........._._._._._._..................w",
      "w........._._._.b._._..................w",
      "w........._._._._._._..................w",
      "w........._._._._.b._..................X",
      "w........._._._._._._..................w",
      "w........._._._._._.b..................w",
      "w......................................w",
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
    ], [
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      "wr.rr..__r..r..r.r..Er..r.rr..r.rr...r.w",
      "w.w.rr......r..r...r....w...r......r.r.w",
      "wrrw.r..._r.._r..r.r..rwr...._.._..r.rfw",
      "w...wr..r._f.....r._..wr.__.....rrrr..rw",
      "w.rr.wrr..._r..r.r...wr._r......rrrr..rw",
      "w._r..wr..r.r_..r.rrw..._rrr._...rrr..rw",
      "w...rr.w.f_..r..r.rw.....r.rr..r.r.rr..w",
      "w..r.r..w.rr...._.w...r.._rrr..r....r..w",
      "w..._.rr.w....r._wfrr._...rrr..r.r..._rw",
      "wr.r...r.rw.....wr..r._.r....r.__..r.rrw",
      "w......r.rrw...w._..rr..r...._...r.....w",
      "w.rr......r....r...r..r.r_..r.rr..._r..w",
      "w.rr......r.mmm..r....r...r......r.rr..w",
      "w..r..._r...r..r.r..r.rr..._.....r.rr..w",
      "w..r..r._.r....r.....r.__......rrr..r._w",
      "wr.._r....r..r.r....r.__.......rrr..r..w",
      "wr...r..r.__..r.__...._rrrr..r.r.rr..rrw",
      "w._r..f_r....r.rr......rrrr..r._.rr.._rw",
      "wr.rr..r.rr..._.r.r._...rrr..r...._...rw",
      "w...rr.r.rr..._.r.r.X...r_r..r.r....r..w",
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
    ], [
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      "wE..r..........r........r.....r..r.....w",
      "w.r.rr.........r...r........r......r.r.X",
      "w.r..r........r..r....r.r..........r.rrw",
      "w.......r..r.....r..............rr.r..rw",
      "w..r...r....r..r.r..............r..r..rw",
      "w.........r.....r........rrr.......r...w",
      "w....r....r.....r........r.rr..r....r..w",
      "w..r...mmmmmm..mmmmmm.....r.r..r.......w",
      "w.....rw....w..w..rrw.......r....r....rw",
      "wr.r...w..r.w..w....w...r....r.....r...w",
      "w......w..r.w..w....wr..r........r.....w",
      "w.rr...w....wr.w....w.r.....r.......r..w",
      "w.rr...w....wrrw.r..w.....r......r.rr..w",
      "w..r...w....w..w....w.rr.........r.rr..w",
      "w.....rwwwwww..wwwwww............r..r..w",
      "wr...r....r..r.r.................r..r..w",
      "w.............r........r.....r........rw",
      "w..r..r._f......_f.....r._f..r..._f...rw",
      "wr.....r__......__.......__..r...__...rw",
      "w......r.......................r....r..w",
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
    ], [
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      "w..E.......rrr......wwwwwwwwwwwwwwwwwwww",
      "w..........rrr......wwwwwwwwwwwwwwwwwwww",
      "w...................wwwwwwwwwwwwwwwwwwww",
      "w..........mmm......wwwwwwwwwwwwwwwwwwww",
      "w.......r..___......wwwwwwwwwwwwwwwwwwww",
      "w........r.___......wwwwwwwwwwwwwwwwwwww",
      "w.........r___......wwwwwwwwwwwwwwwwwwww",
      "w........X.mmm......wwwwwwwwwwwwwwwwwwww",
      "w..........___......wwwwwwwwwwwwwwwwwwww",
      "w..........___......wwwwwwwwwwwwwwwwwwww",
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
  ];
}();
