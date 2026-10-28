using System.Collections.Generic;

class Player // Singleton
{
    private static Player _instance;
    public static Player Instance
    {
        get {
            if (_instance == null) _instance = new Player();
            return _instance;
        }
    }

    public string Id { get; set; }
    public string Name { get; set; }
    public bool[] ScenesCompleted { get; } = new bool[ActivityIndex.Count];

    private Player() {}

    // Spreadsheet row layout: id, name, one 0/1 column per activity
    public void LoadData(string[] data)
    {
        Id = data[0];
        Name = data[1];
        for (int i = 0; i < ScenesCompleted.Length; i++)
            ScenesCompleted[i] = !data[i + 2].Equals("0");
    }

    public IList<object> ToObjectList()
    {
        return ToObjectList(Name, ScenesCompleted);
    }

    // Row (without the id column) of a player who has not played yet
    public static IList<object> NewPlayerRow(string name)
    {
        return ToObjectList(name, new bool[ActivityIndex.Count]);
    }

    private static IList<object> ToObjectList(string name, bool[] scenesCompleted)
    {
        List<object> list = new List<object>() {name};
        foreach (bool scene in scenesCompleted) list.Add(scene ? 1 : 0);

        return list;
    }

    public void ClearData()
    {
        _instance = new Player();
    }
}
