abstract class Store<T>
{
    public ICollection<T> Items { get; protected set; }

    protected Store(ICollection<T> items)
    {
        Items = items;
    }
}
class PetStore : Store<IAnimal>
{
    public PetStore() : base(new LinkedList<IAnimal>())
    {
        Items.Add(new Dog());
        Items.Add(new Cat());
    }
}

class SpecificPetStore<T> : Store<T> where T : IAnimal
{
    public SpecificPetStore() : base(new List<T>()) { }
    static void Test()
    {
        var store = new SpecificPetStore<Dog>();
    }
}

