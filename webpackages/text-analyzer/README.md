## text-analyzer
Webpackage containing components to analyse text
### Webpackage Artifacts
| Name | Type | Description | Links |
|---|---|---|---|
| **docs** | Application | Generated webpackage documentation. | [docs](https://cubbles.world/shared/text-analyzer@1.0.0/docs/index.html) |
| **word-count** | Elementary Component | Component to count words occurrences within a text | [demo](https://cubbles.world/shared/text-analyzer@1.0.0/word-count/demo/index.html) [docs](https://cubbles.world/shared/text-analyzer@1.0.0/word-count/docs/index.html) |
### Use of components
The html file should contain the desire component using its tag, e.g. the `<word-count>`, as follows:
```html
<word-count cubx-webpackage-id="text-analyzer@1.0.0"></word-count>
```
Note that the `webpackageId` should be provided as attribute, which in this case is: `text-analyzer@1.0.0`.

Additionally, this component can be initialized using the `<cubx-core-slot-init>` tag (available from _cubx.core.rte@1.9.0_).
For example, lets initialize the `text` slot to get the basic package of ckeditor:

```html
<word-count cubx-webpackage-id="text-analyzer@1.0.0">
    <!--Initilization-->
    <cubx-core-init style="display:none">
        <cubx-core-slot-init slot="text">"This is a text to be analysed"</cubx-core-slot-init>
    </cubx-core-init>
</word-count>
```

Or it can be initialized and later manipulated from Javascript as follows:

```javascript
var component= document.querySelector('word-count');
// Wait until CIF is ready
document.addEventListener('cifReady', function() {
  // Manipulate slots
  component.setText("This is a text to be analysed");
});
```

[Want to get to know the Cubbles Platform?](https://cubbles.github.io)
