package nl.hsleiden.icpt.opdrachten

object ExceptionHandling {

  /** Maak hier een referential transparent functie die lh vermenigvuldigd met
    * rechts indien er met 0 gedeeld moet worden. geef dan een left met infinity
    * @param lh
    * @param rh
    * @return
    */
  def division(lh: Int, rh: Int): Either[String, Int] = {
    if (rh == 0) Left("Kan niet delen door nul") else Right(lh / rh)
  }

  /** Voer de bovenstaande divisie methode uit. Incrementeer dit resultaat met 1
    * @param lh
    * @param rh
    * @return
    */
  def divisionAddOne(lh: Int, rh: Int): Either[String, Int] = {
    // Gebruik hier de map functor. https://www.geeksforgeeks.org/scala-map-method/
    division(lh, rh).map(_ + 1)
  }

  /** Maak de functie af. Geef terug hallo <naam> Indien naam leeg is (""). Geef
    * een error mee
    * @param name
    * @return
    */
  def appendHi(name: String): Either[String, String] = {
    if (name.isEmpty) Left("Naam is leeg") else Right("hallo " + name)
  }

  /** Doe de appendHi en doe dan daarna gelijk toUpperCase. Gebruik hier de map
    * functor voor.
    * @param name
    * @return
    */
  def doeAppendHiMetToUpper(name: String): Either[String, String] = {
    // Hier heb je de functor map voor nodig
    appendHi(name).map(_.toUpperCase)
  }

  /** Maak de functie af. Maak het getal n negatief. Als het getal al negatief
    * is. Geef None mee bijv: n = 1 => Some(-1), n = -1 => None
    *
    * @param n
    * @return
    */
  def maakNegatief(n: Int): Option[Int] = {
    if (n < 0) None else Some(n * -1)
  }

  def maakNegatiefAppend1(n: Int): Option[Int] = {
    maakNegatief(n).map(_ + 1)
  }

}
