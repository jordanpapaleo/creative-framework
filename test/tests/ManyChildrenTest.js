import View from '../../display/View';

export class ManyChildrenTest {
  constructor(node) {
    window.rootNode = node;
    
    // var test = new FamousPlatform.domRenderables.DOMElement(node);
    // test.setProperty('backgroundColor', 'grey');
    
    for(var i=0; i<20; i++) {
      var nestedNode = node.addChild();
      var nestedDiv = new FamousPlatform.domRenderables.DOMElement(nestedNode);
      nestedDiv.setProperty('backgroundColor','red');

      nestedNode.setSizeMode(1, 1, 1);
      nestedNode.setAbsoluteSize(10, 10, 10);

      nestedNode.setPosition(i * 20, i * 20, 0)
      
    }
  }
}
