import React, {PropTypes, Component} from 'react'
import {Row, Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import {join} from 'path'

import {files} from '../actions'

import Tree from './../components/files/tree'
import ActionBar from './../components/files/action-bar'
import Breadcrumbs from './../components/files/breadcrumbs'

class FilesExplorer extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    root: PropTypes.string.isRequired,
    tmpDir: PropTypes.shape({
      root: PropTypes.string.isRequired,
      name: PropTypes.string
    }),
    setRoot: PropTypes.func.isRequired,
    createTmpDir: PropTypes.func.isRequired,
    setTmpDirName: PropTypes.func.isRequired,
    createDir: PropTypes.func.isRequired,
    rmTmpDir: PropTypes.func.isRequired
  };

  _onRowClick = (file) => {
    const {root} = this.props

    if (file.Type === 'directory') {
      this.props.setRoot(join(root, file.Name))
    } else {
      // TODO: File Preview
    }
  };

  _onCreateDir = (event) => {
    this.props.createTmpDir(this.props.root)
  };

  _onCancelCreateDir = (event) => {
    this.props.rmTmpDir()
  };

  render () {
    const {list, root, setRoot, tmpDir} = this.props

    return (
      <div className='files-explorer'>
        <Row>
          <Col sm={12}>
            <Row>
              <Col sm={12}>
                <Breadcrumbs
                  files={list}
                  root={root}
                  setRoot={setRoot}
                />
                <ActionBar
                  onCreateDir={this._onCreateDir}/>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Tree
                  files={list}
                  tmpDir={tmpDir}
                  onRowClick={this._onRowClick}
                  onTmpDirChange={this.props.setTmpDirName}
                  onCreateDir={this.props.createDir}
                  onCancelCreateDir={this._onCancelCreateDir}/>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const {files} = state

  return files
}

export default connect(mapStateToProps, {
  setRoot: files.filesSetRoot,
  createTmpDir: files.filesCreateTmpDir,
  setTmpDirName: files.filesSetTmpDirName,
  createDir: files.filesCreateDir,
  rmTmpDir: files.filesRmTmpDir
})(FilesExplorer)