using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class DragAndDrop3 : DraggableItem
{
    private LineRenderer line;

    protected override void Awake()
    {
        base.Awake();
        line = GetComponent<LineRenderer>();
    }

    public override void OnBeginDrag(PointerEventData eventData)
    {
        base.OnBeginDrag(eventData);
        line.positionCount = 1;
        SetLinePosition(0, eventData);
    }

    public override void OnDrag(PointerEventData eventData)
    {
        line.positionCount = 2;
        SetLinePosition(1, eventData);
        base.OnDrag(eventData);
    }

    protected override void OnAcceptedDrop()
    {
        GetComponentInParent<Button>().interactable = false;
    }

    private void SetLinePosition(int index, PointerEventData eventData)
    {
        Vector3 position = eventData.pointerCurrentRaycast.worldPosition;
        line.SetPosition(index, new Vector3(position.x, position.y, 0f));
    }
}
