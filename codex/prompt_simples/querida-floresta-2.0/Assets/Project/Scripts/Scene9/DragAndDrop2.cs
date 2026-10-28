using UnityEngine;
using UnityEngine.EventSystems;

public class DragAndDrop2 : DragAndDrop
{
    [SerializeField] private RectTransform slotSize;
    private Vector2 originalSize;

    protected override void Awake()
    {
        base.Awake();
        originalSize = ItemTransform.sizeDelta;
    }

    public override void OnBeginDrag(PointerEventData eventData)
    {
        base.OnBeginDrag(eventData);
        ItemTransform.sizeDelta = slotSize.sizeDelta;
    }

    protected override void OnRejectedDrop()
    {
        ItemTransform.sizeDelta = originalSize;
    }
}
