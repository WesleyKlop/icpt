import nl.hsleiden.icpt.opdrachten.Immutability.{faculty, pow}
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should

class ImmutabilityTests  extends AnyFlatSpec with should.Matchers {


  "faculty" should " scenario 1" in {
    faculty(4) should be (24)
  }

  "faculty" should " scenario 2" in {
    faculty(12) should be (479001600)
  }

  "pow " should " scenario 1" in {
    pow(4,5) should be (Math.pow(4,5))
  }

  "pow" should "scenario 2" in {
    pow(7,3) should be (Math.pow(7,3))
  }
}
