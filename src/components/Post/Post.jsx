import React from 'react'
import { Link } from "react-router-dom"

const Post = ({post}) => {
  return (
    <div>
         <div className="box has-text-grey-darker">
      <header>
        <h1 class="title is-5 pb-1 mt-3">title</h1>
      </header>
      <div class="pb-4">
        description
      </div>
      <section class="is-flex is-flex-direction-row is-justify-content-space-between level-item">
        <div>
          <a
            href="/posts/<%= article._id %>"
            class="button is-small is-link is-outlined"
          >
            {/* <Link to={`/post/${post._id}`} > */}Read more{/* </Link> */}
          </a>
        </div>
      </section>
    </div>
    </div>
  )
}

export default Post