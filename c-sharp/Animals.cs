interface IAnimal
{
    void MakeSound();
}
abstract class Animal
{
    public string Type { get; private set; }
    public Animal(string type)
    {
        this.Type = type;
    }
    public abstract void MakeSound();
    public void PrintType()
    {
        Console.WriteLine(this.Type);
    }
}

class Dog : Animal, IAnimal
{
    public Dog() : base("dog") { }
    public override void MakeSound()
    {
        Console.WriteLine("Woof!");
    }

    public void ShowHappiness()
    {
        Console.WriteLine("wags tail");
    }
}

