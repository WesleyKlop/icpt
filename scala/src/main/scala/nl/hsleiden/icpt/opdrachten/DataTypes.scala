package nl.hsleiden.icpt.opdrachten

import scala.annotation.tailrec

sealed trait Dier

// Sum type en product type.
case class Kat(naam: String, leeftijd: Int) extends Dier
case class Hond(naam: String, ras: String, leeftijd: Int) extends Dier

/** Gebruik voor de gehele klasse pattern matching en recursie Bonus punten als
  * je tail recursie kan toevoegen
  */
object DataTypes {

  /** Bereken hoeveel honden in een gegeven sequentie zitten. Gebruik hiervoor
    * pattern matching en recursie
    *
    * @param dieren
    *   de lijst met dieren
    * @return
    *   Hoeveelheid honden die hierin zitten
    */
  def hoeveelheidHonden(dieren: Seq[Dier]): Int = {
    @tailrec
    def hoeveelheidHonden(dieren: Seq[Dier], acc: Int): Int = dieren match {
      case Hond(_, _, _) :: tail => hoeveelheidHonden(tail, acc + 1)
      case _ :: tail             => hoeveelheidHonden(tail, acc)
      case Nil                   => acc
    }

    hoeveelheidHonden(dieren, 0)
  }

  /** Tel hoeveel honden er in het lijstje zitten die 1 zijn.
    *
    * @param dieren
    * @return
    */
  def hoeveelHeidHondenZijnEen(dieren: Seq[Dier]): Int = {
    @tailrec
    def hoeveelHeidHondenZijnEen(dieren: Seq[Dier], acc: Int): Int =
      dieren match {
        case Hond(_, _, 1) :: tail => hoeveelHeidHondenZijnEen(tail, acc + 1)
        case _ :: tail             => hoeveelHeidHondenZijnEen(tail, acc)
        case Nil                   => acc
      }

    hoeveelHeidHondenZijnEen(dieren, 0)
  }

  /** Tel de totale leeftijd van alle honden op.
    * @param dieren
    * @return
    */
  def totaleLeeftijdHonden(dieren: Seq[Dier]): Int = {
    def totaleLeeftijdHonden(dieren: Seq[Dier], accAge: Int): Int =
      dieren match {
        case Hond(_, _, age) :: tail => totaleLeeftijdHonden(tail, accAge + age)
        case _ :: tail               => totaleLeeftijdHonden(tail, accAge)
        case Nil                     => accAge
      }
    totaleLeeftijdHonden(dieren, 0)
  }

  /** Reken de leeftijd van alle labradors bij elkaar!
    *
    * @param dieren
    * @param resultaat
    * @return
    */
  def totaleLeeftijdLabradors(dieren: Seq[Dier]): Int = {
    def totaleLeeftijdLabradors(dieren: Seq[Dier], accAge: Int): Int =
      dieren match {
        case Hond(_, "Labrador", age) :: tail =>
          totaleLeeftijdLabradors(tail, accAge + age)
        case _ :: tail => totaleLeeftijdLabradors(tail, accAge)
        case Nil       => accAge
      }

    totaleLeeftijdLabradors(dieren, 0)
  }
}
