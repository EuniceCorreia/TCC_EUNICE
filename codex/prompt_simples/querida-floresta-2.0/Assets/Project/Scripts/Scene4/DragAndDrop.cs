using UnityEngine;
using UnityEngine.EventSystems;

public class DragAndDrop : DraggableItem
{
    public override void OnBeginDrag(PointerEventData eventData)
    {
        base.OnBeginDrag(eventData);
        GetComponentInParent<RectTransform>().SetAsLastSibling();
    }
}
