# MESSAGE BOX

`<Message />` is always available in page and listens actions type of `MESSAGES`.
Message are typeof : `IMessageTypeEnums` or `IConfirmTypeEnums`
`IMessageTypeEnums` action types decides style/design of the dialog.
`IConfirmTypeEnums` has it's fixed desing so just extends Message box where user can make a decision.

**_Sample Implemantation_**

```
    // Import useDispatch first
    import {  useDispatch } from "react-redux";
    ..
    ..
    ()=>{
      // in compnent get it on var
      const dispatch = useDispatch()

     // Then dispatch an action similar to below to show a message dialog

        dispatch({
          type:IMessageTypeEnums.[INFO|ERROR|WARNING],
          icon: IconNameEnums.[ADD|CLOSE|....]
          caption:"Lorem ... ",
          body: HTMLDOMElement | ReactElement
          closable: true | false // show or hide [X] close button
        })

      return <>
                ...
            </>
    }
```
