<template>
  <header>
    <NuxtLink to="/">
      <h1>Jean Marquès</h1>
    </NuxtLink>
    <ul>
      <li>
        <NuxtLink to="/">
          work
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/info">
          info
        </NuxtLink>
      </li>
      <li>
        <a href="https://www.instagram.com/jeanmarques.jm/" target="_blank" rel="noopener">
          <img class="logo_instagram" src="/instagram.png" alt="Instagram">
        </a>
      </li>
    </ul>
  </header>
</template>

<style lang="scss" scoped>
header {
  font-size: 14px;
  display: flex;
  align-items: baseline;

  @media (max-width: $breakpoint-tablet) {
    font-size: 4vw;
    padding-left: 5%;
  }

  a {
    display: inline-flex;
    text-decoration: none;
    color: #222222;

    h1 {
      font-size: 14px;
      font-weight: normal;

      @media (max-width: $breakpoint-tablet) {
        font-size: 4vw;
      }
    }
  }

  ul {
    display: flex;
    list-style: none;
    align-items: center;

    li {
      a {
        text-decoration: none;
        color: #222222;

        .logo_instagram {
          width: 13px;
          height: 13px;

          @media (max-width: $breakpoint-tablet) {
            width: 3vw;
            height: auto;
          }
        }
      }

      a:hover {
        border-bottom: 1px solid #222222;
      }

      .router-link-exact-active {
        border-bottom: 1px solid #222222;
      }
    }

    li:not(:last-child):after {
      content: '/';
      font-size: 15px;
      padding: 0 5px;

      @media (max-width: $breakpoint-tablet) {
        font-size: 3vw;
      }
    }
  }
}
</style>
