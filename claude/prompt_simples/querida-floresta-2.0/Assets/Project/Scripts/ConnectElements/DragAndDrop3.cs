using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

// Item that draws a line from where the drag started to the pointer
public class DragAndDrop3 : DraggableItem
{
    private LineRenderer line;

    protected override void Awake()
    {
        base.Awake();
        line = GetComponent<LineRenderer>();
    }

    private static Vector3 pointerPosition(PointerEventData eventData)
    {
        Vector3 worldPosition = eventData.pointerCurrentRaycast.worldPosition;
        return new Vector3(worldPosition.x, worldPosition.y, 0);
    }

    public override void OnBeginDrag(PointerEventData eventData)
    {
        base.OnBeginDrag(eventData);
        line.positionCount = 1;
        line.SetPosition(0, pointerPosition(eventData));
    }

    public override void OnDrag(PointerEventData eventData)
    {
        line.positionCount = 2;
        line.SetPosition(1, pointerPosition(eventData));
        base.OnDrag(eventData);
    }

    protected override void lockInPlace()
    {
        base.lockInPlace();
        GetComponentInParent<Button>().interactable = false;
    }
}
