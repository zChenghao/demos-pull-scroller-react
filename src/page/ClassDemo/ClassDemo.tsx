import PullScroller from 'pull-scroller-react';
import { Component } from 'react';
import { DemoList } from '../../components';
import { BackTop, PageLoading, PullDownLoader, PullUpLoader } from '../../components/CustomUI';
import { ListItem, mockGetListData } from '../../utils/getMockData';

interface State {
  list: ListItem[];
  windowHeight: string;
  pageIndex: number;
  pageTotal: number;
  noMore: boolean;
  isPullUp: boolean;
  pullDownConfig: { threshold: number; stop: number };
}

class ClassDemo extends Component<{}, Readonly<State>> {
  constructor(props) {
    super(props);
    // init state
    this.state = {
      list: [],
      windowHeight: '100%',
      pageIndex: 0,
      pageTotal: 75,
      noMore: false,
      isPullUp: false,
      pullDownConfig: { threshold: 100, stop: 60 }
    };
    // bind this
    this.makeRefresher = this.makeRefresher.bind(this);
    this.makePullUpLoader = this.makePullUpLoader.bind(this);
    this.makeBackTop = this.makeBackTop.bind(this);
    this.refreshHandler = this.refreshHandler.bind(this);
    this.loadMoreHandler = this.loadMoreHandler.bind(this);
  }

  async componentDidMount() {
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const res = await mockGetListData(0, 30, 300);
    this.setState({
      list: res,
      windowHeight: windowHeight + 'px',
      pageIndex: res.length,
      isPullUp: res.length ? true : false
    });
  }

  render() {
    const { windowHeight, list, pullDownConfig, isPullUp } = this.state;
    return (
      <>
        {list.length ? (
          <PullScroller
            height={windowHeight}
            backTop={this.makeBackTop}
            enablePullDown
            pullDownConfig={pullDownConfig}
            pullDownHandler={this.refreshHandler}
            pullDownLoader={this.makeRefresher}
            enablePullUp={isPullUp}
            pullUpHandler={this.loadMoreHandler}
            pullUpLoader={this.makePullUpLoader}
          >
            <DemoList list={list} />
          </PullScroller>
        ) : (
          <PageLoading />
        )}
      </>
    );
  }

  // async pullDownHandler
  async refreshHandler() {
    try {
      const res = await mockGetListData(0, 30);
      this.setState({ list: res, pageIndex: res.length, noMore: false });
      return { delay: 500 };
    } catch (error) {
      return { error: true };
    }
  }

  // async pullUpHandler
  async loadMoreHandler() {
    const { noMore, pageIndex, pageTotal } = this.state;
    if (noMore && pageIndex >= pageTotal) return { immediately: true };
    try {
      const res = await mockGetListData(this.state.pageIndex, 15);
      if (pageIndex < pageTotal) {
        this.setState((state) => ({
          list: [...state.list, ...res],
          pageIndex: state.pageIndex + res.length
        }));
      } else {
        this.setState({ noMore: true });
      }
      return { delay: 200 };
    } catch (error) {
      return { error: true };
    }
  }

  // PullDownLoader
  makeRefresher({ beforePullDown, isPullingDown, isPullDownError }) {
    return (
      <PullDownLoader beforePullDown={beforePullDown} isPullingDown={isPullingDown} isRefreshError={isPullDownError} />
    );
  }

  // PullUpLoader
  makePullUpLoader({ beforePullUp, isPullingUp, isPullUpError }) {
    return (
      <PullUpLoader
        beforePullUp={beforePullUp}
        isPullUpLoading={isPullingUp}
        isPullLoadError={isPullUpError}
        isNoMoreData={this.state.noMore}
      />
    );
  }

  // back-top
  makeBackTop({ handleScrollToTop, show }) {
    return <BackTop key="back_top" scrollToTop={handleScrollToTop} show={show} />;
  }
}

export default ClassDemo;
