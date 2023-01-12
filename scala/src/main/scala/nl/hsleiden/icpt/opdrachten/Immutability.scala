package nl.hsleiden.icpt.opdrachten

import scala.annotation.tailrec

object Immutability {

  /** Programmeer de faculteit. Dit is door de reeks optellend met elkaar te
    * vermenigvuldigen tot 2. Bijvoorbeeld n = 5 Bonuspunten als je tailrecursie
    * gebruikt 5 * 4 * 3 * 2 => Antwoord 120
    * @param n
    * @return
    */
  def faculty(n: Int): Int = {
    @tailrec
    def faculty(n: Int, acc: Int): Int = {
      if n > 1 then faculty(n - 1, acc * n) else acc
    }
    faculty(n, 1)
  }

  /** Met deze functie maken we onze eigen machten verheffen. Java (Math.pow)
    * Doe dit recursief. * Bonuspunten. Zorg dat deze functie geannoteerd kan
    * worden met @tailrec
    * @param n
    * @return
    */
  def pow(lh: Int, rh: Int): Double = {
    @tailrec
    def pow(lh: Int, rh: Int, acc: Double): Double = {
      if rh > 0 then pow(lh, rh - 1, acc * lh) else acc
    }
    pow(lh, rh, 1)
  }

}
