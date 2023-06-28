package input

type Input struct {
	Unit  string
	Value int
	Year  *Input
	Month *Input
}

func (i *Input) Validate() Result {
	switch i.Unit {
	case "Year":
		return Result{
			Unit:  i.Unit,
			Valid: ValidateYear(i.Value),
		}
	case "Month":
		return Result{
			Unit:  i.Unit,
			Valid: ValidateMonth(i.Value),
		}
	case "Day":
		return Result{
			Unit:  i.Unit,
			Valid: ValidateDay(i.Value, i.Month.Value, i.Year.Value),
		}
	case "Hour":
		return Result{
			Unit:  i.Unit,
			Valid: ValidateHour(i.Value),
		}
	case "Minute":
		return Result{
			Unit:  i.Unit,
			Valid: ValidateMinute(i.Value),
		}
	}

	return Result{
		Unit:  i.Unit,
		Valid: false,
	}
}

func GetInputForUnit(unit string, message string) Input {
	inp := Input{}

	inp.Unit = unit
	inp.Value = GetUserInput(message)
	return inp
}

func AskForInput() []Input {
	inputs := make([]Input, 5)

	inputs[0] = GetInputForUnit("Year", "Voer een jaar in: ")
	inputs[1] = GetInputForUnit("Month", "Voer een maand in: ")
	inputs[2] = GetInputForUnit("Day", "Voer een dag in: ")
	inputs[2].Year = &inputs[0]
	inputs[2].Month = &inputs[1]
	inputs[3] = GetInputForUnit("Hour", "Voer een uur in: ")
	inputs[4] = GetInputForUnit("Minute", "Voer een minuut in: ")

	return inputs
}
