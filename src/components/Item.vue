<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    isExpand: {
      type: Boolean,
      default: true
    }
  },
  render(h, context) {
    const { icon, title, isExpand } = context.props
    const vnodes = []

    // if (icon) {
      // vnodes.push(<img src={ icon }/>)
      // vnodes.push(<svg-icon icon-class={ icon }/>)
      // return h('img' ,{
      //   src: icon
      // })
    // }

    if (isExpand && title) {
      // vnodes.push(<span slot='title'>{(title)}</span>)
      // let el = h('img', {
      //     src: icon
      //   })
      return h('span' ,{
        slot: 'title'
      },title)
    }
    return vnodes
    
  }
}
</script>

