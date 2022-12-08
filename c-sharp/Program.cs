// These are the instructions to execute on the subject later
var instructions = new List<(Triangle.TriangleModification, int)>();

// Asks for a valid number (both positive / negative) and appends the instruction
void createInstruction(string message, Triangle.TriangleModification instruction)
{
    int output;
    do
    {
        Console.Write(message + " ");
    } while (!int.TryParse(Console.ReadLine(), out output));
    instructions.Add((instruction, output));
}

// Output the width and height of a triangle
void printTriangleInfo(Triangle t) => Console.WriteLine("Triangle has {0} width and {1} height!", t.Width, t.Height);

var subject = new Triangle(0, 0);
var isAskingQuestions = true;

// These are the possible options in the main menu.
var Menu = new Dictionary<string, MenuOption>()
{
    {"0", () => createInstruction("How much width do you want to add?", subject.AddWidth)},
    {"1", () => createInstruction("How much height do you want to add?", subject.AddHeight)},
    {"2", () => createInstruction("How much size do you want to add?", subject.AddSize)},
    { "3", () => { isAskingQuestions = false; }}
};

#pragma warning disable CS8604 // this is expected and handled behavior
while (isAskingQuestions)
{
    Console.WriteLine(@"
Kies optie:
0. Add width
1. Add height
2. Increase size
3. Done
".Trim());
    var choice = Console.ReadLine();

    try
    {
        Menu[choice]();
    }
    catch (KeyNotFoundException)
    {
        // If the user makes an invalid choice, just continue.
        Console.WriteLine("Unknown option chosen");
        continue;
    }
    catch (ArgumentNullException)
    {
        Console.WriteLine("Failed to receive input. ");
        Environment.Exit(1);
    }
}
#pragma warning restore CS8604

// Execute all instructions and show the progress between each step.
printTriangleInfo(subject);
foreach (var (instruction, val) in instructions)
{
    instruction(val);
    printTriangleInfo(subject);
}