import * as React from 'react'
import { connect } from 'react-redux'

import { DefaultPlayer as VideoPlayer } from 'react-html5video'
import styled from '../../utils/styled'
import Page from '../../components/layout/Page'
import Container from '../../components/layout/Container'
import LoadingOverlay from '../../components/data/LoadingOverlay'
import LoadingOverlayInner from '../../components/data/LoadingOverlayInner'
import LoadingSpinner from '../../components/data/LoadingSpinner'

import { ApplicationState } from '../../store'
import { Video } from '../../store/videos/types'
import { fetchRequest } from '../../store/videos/actions'

import 'react-html5video/dist/styles.css'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  data: Video[]
  errors?: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchVideos: typeof fetchRequest
}

// VideosIndexPage state
interface State {
  videoUrl?: string
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch

class VideosIndexPage extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props)

    this.state = {
      videoUrl: undefined
    }
  }

  public componentDidMount() {
    const { data, fetchVideos } = this.props

    if (data.length === 0) {
      fetchVideos()
    }
  }

  private handleClick(url: string) {
    this.setState({ videoUrl: url })
  }

  private renderData() {
    const { data } = this.props

    return (
      <div>
        <h1>Videos!</h1>
        {data.map((video, i) => {
          return (
            <div>
              <h1>{video.name}</h1>
              <button type="button" onClick={() => this.handleClick(video.video)}>
                Test
              </button>
              <img src={video.image} alt={video.name} />
              <p>{video.description}</p>
            </div>
          )
        })}
      </div>
    )
  }

  public render() {
    const { loading } = this.props

    return (
      <Page>
        <Container>
          <TableWrapper>
            {loading && (
              <LoadingOverlay>
                <LoadingOverlayInner>
                  <LoadingSpinner />
                </LoadingOverlayInner>
              </LoadingOverlay>
            )}
            {this.renderData()}
          </TableWrapper>
        </Container>
      </Page>
    )
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ videos }: ApplicationState) => ({
  loading: videos.loading,
  errors: videos.errors,
  data: videos.data
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  fetchVideos: fetchRequest
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(mapStateToProps, mapDispatchToProps)(VideosIndexPage)

const TableWrapper = styled('div')`
  position: relative;
  max-width: ${props => props.theme.widths.md};
  margin: 0 auto;
  min-height: 200px;
`

const TeamDetail = styled('td')`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 66px;
`

const TeamLogo = styled('div')`
  position: relative;
  width: 50px;
  height: 50px;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const TeamName = styled('div')`
  flex: 1 1 auto;
  height: 100%;
  margin-left: 1rem;

  a {
    color: ${props => props.theme.colors.brand};
  }
`
