package nl.hsleiden.icpt.opdrachten

def division(lh: Int, rh: Int): Either[String, Int] = {
  if (rh == 0) Left("Kan niet delen door nul") else Right(lh / rh)
}

println(division(9, 3) match {
  case Right(v) => "Het resultaat is: " + v.toString()
  case Left(e) => "Error: " + e
})

val add = (x: Int, y: Int) => x + y

def sumList(numbers: List[Int]): Int = {
  @tailrec
  def sumTailRec(numbers: List[Int], accum: Int): Int = {
    if (numbers.isEmpty) accum
    else sumTailRec(numbers.tail, accum + numbers.head)
  }

  sumTailRec(numbers, 0)
}