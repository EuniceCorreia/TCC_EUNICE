using UnityEngine;

public class Slot : DropSlot
{
    protected override void onCorrectDrop(GameObject item)
    {
        item.transform.position = transform.position;
        Destroy(gameObject);
    }
}
