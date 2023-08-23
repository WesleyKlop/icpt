// These are the instructions to execute on the subject later
var instructions = new List<(Triangle.Modification, int)>();

// Asks for a valid number (both positive / negative) and appends the instruction
MenuOption createInstruction(string message, Triangle.Modification instruction)
{
    return () =>
    {
        int output;
        do
            Console.Write(message + " ");
        while (!int.TryParse(Console.ReadLine(), out output));
        instructions.Add((instruction, output));
    };
}

// Output the width and height of a triangle
void printTriangleInfo(Triangle t) => Console.WriteLine("Triangle has {0} width and {1} height!", t.Width, t.Height);

var subject = new Triangle(0, 0);
var isAskingQuestions = true;

// These are the possible options in the main menu.
var menu = new Dictionary<string, MenuOption>()
{
    {"0",  createInstruction("How much width do you want to add?", subject.AddWidth)},
    {"1",  createInstruction("How much height do you want to add?", instruction: subject.AddHeight)},
    {"2",  createInstruction(instruction: subject.AddSize, message: "How much size do you want to add?")},
    {"3", () => { isAskingQuestions = false; }},
};

string PrintMenuAndGetChoice()
{
    Console.WriteLine(@"
Kies optie:
0. Add width
1. Add height
2. Increase size
3. Done
".Trim());
    var choice = Console.ReadLine();
    if (choice == null)
    {
        Console.WriteLine("Failed to receive input. ");
        Environment.Exit(1);
    }
    return choice;
}

while (isAskingQuestions)
{
    var choice = PrintMenuAndGetChoice();

    if (menu.ContainsKey(choice))
        menu[choice]();
    else
        Console.WriteLine("Unknown option chosen");
}

// Execute all instructions and show the progress between each step.
foreach (var (executeInstruction, amount) in instructions)
{
    executeInstruction(amount);
    printTriangleInfo(subject);
}
