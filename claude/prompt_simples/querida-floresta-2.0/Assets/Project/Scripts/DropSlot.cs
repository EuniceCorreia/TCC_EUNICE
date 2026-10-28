using UnityEngine;
using UnityEngine.EventSystems;

// Target of a DraggableItem. Tells the scene controller whether the right
// item was dropped on it.
public abstract class DropSlot : MonoBehaviour, IDropHandler
{
    [SerializeField] private GameObject correctItem;
    [SerializeField] private DragAndDropSceneController controller;
    [SerializeField] private AudioController audioController;

    public void OnDrop(PointerEventData eventData)
    {
        GameObject droppedItem = eventData.pointerDrag;

        if (droppedItem == correctItem) {
            correctItem.GetComponent<DraggableItem>().IsPlaced = true;
            onCorrectDrop(droppedItem);
            audioController.hitSound();
            controller.registerCorrectDrop();
        }
        else {
            onWrongDrop();
            controller.registerWrongDrop();
        }
    }

    // Default: snaps the item to the slot and hides the slot
    protected virtual void onCorrectDrop(GameObject item)
    {
        item.transform.position = transform.position;
        gameObject.SetActive(false);
    }

    protected virtual void onWrongDrop() {}
}
