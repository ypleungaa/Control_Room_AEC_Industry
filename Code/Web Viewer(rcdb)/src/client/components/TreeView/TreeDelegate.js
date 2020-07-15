import TreeDelegateBase from './base/TreeDelegateBase'
import EventsEmitter from 'EventsEmitter'

/// //////////////////////////////////////////////////////////////////
//
//
/// //////////////////////////////////////////////////////////////////
export default class TreeDelegate extends
  EventsEmitter.Composer(TreeDelegateBase) {
  /// ////////////////////////////////////////////////////////////////
  //
  //
  /// ////////////////////////////////////////////////////////////////
  constructor (container, contextMenu) {
    super()

    this.contextMenu = contextMenu

    this.container = container

    this.clickTimeout = 0
  }

  /// ////////////////////////////////////////////////////////////////
  //
  //
  /// ////////////////////////////////////////////////////////////////
  getTreeNodeId (node) {
    return node.id
  }

  /// ////////////////////////////////////////////////////////////////
  //
  //
  /// ////////////////////////////////////////////////////////////////
  isTreeNodeGroup (node) {
    return node.group
  }

  /// ////////////////////////////////////////////////////////////////
  //
  //
  /// ////////////////////////////////////////////////////////////////
  onTreeNodeIconClick (tree, node, event) {
    clearTimeout(this.clickTimeout)

    this.clickTimeout = setTimeout(() => {
      this.emit('node.iconClick', node)

      !tree.isCollapsed(node)
        ? node.collapse()
        : node.expand()
    }, 200)
  }

  /// ////////////////////////////////////////////////////////////////
  //
  //
  /// ////////////////////////////////////////////////////////////////
  nodeClickSelector (event) {
    const selector = ['HEADER', 'LABEL']

    return (selector.indexOf(event.target.nodeName) > -1)
  }

  /// ////////////////////////////////////////////////////////////////
  //
  //
  /// ////////////////////////////////////////////////////////////////
  onTreeNodeClick (tree, node, event) {
    if (this.nodeClickSelector(event)) {
      clearTimeout(this.clickTimeout)

      this.clickTimeout = setTimeout(() => {
        this.emit('node.click', node)

        !tree.isCollapsed(node)
          ? node.collapse()
          : node.expand()
      }, 200)
    }
  }

  /// ////////////////////////////////////////////////////////////////
  //
  //
  /// ////////////////////////////////////////////////////////////////
  onTreeNodeDoubleClick (tree, node, event) {
    if (this.nodeClickSelector(event)) {
      clearTimeout(this.clickTimeout)

      this.emit('node.dblClick', node)
    }
  }

  /// ////////////////////////////////////////////////////////////////
  //
  //
  /// ////////////////////////////////////////////////////////////////
  onTreeNodeRightClick (tree, node, event) {
    event.stopPropagation()
    event.preventDefault()

    if (this.nodeClickSelector(event)) {
      this.contextMenu.show(event, node)
    }
  }

  /// ////////////////////////////////////////////////////////////////
  //
  //
  /// ////////////////////////////////////////////////////////////////
  getTreeNodeLabel (node) {
    return node.name
  }
}
