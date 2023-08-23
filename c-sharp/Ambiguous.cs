interface Meow
{
    public string Say();
}

public class Cat : Meow, IAnimal
{
    public string Say()
    {
        return "meow";
    }
    public void MakeSound()
    {
        Console.WriteLine(Say());
    }
}

class Ambiguous
{
    public void SayToConsole(Meow thing)
    {
        Console.WriteLine(thing.Say());
    }

    public void SayToConsole(Cat cat)
    {
        // Cats like to repeat themselves
        Console.WriteLine(cat.Say());
        Console.WriteLine(cat.Say());
    }

    public void SayTheLine(string message = "hello there!")
    {
        Console.WriteLine(message);
    }
    public void SayTheLine()
    {
        Console.WriteLine("hello world!");
    }
}