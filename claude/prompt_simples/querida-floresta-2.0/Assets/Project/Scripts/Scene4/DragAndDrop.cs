using UnityEngine.EventSystems;

public class DragAndDrop : DraggableItem
{
    public override void OnBeginDrag(PointerEventData eventData)
    {
        base.OnBeginDrag(eventData);
        rectTransform.SetAsLastSibling(); // Drawn above the other items
    }
}
