# bootstrap-vue

- https://bootstrap-vue.js.org/

sample base:

~~~html
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Home</title>
  <!-- https://bootstrap-vue.js.org/docs -->
  <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap/dist/css/bootstrap.min.css" />
  <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css" />
</head>

<body>

  <div id="app">
    <h1>Hello</h1>
    <!-- here... -->
  </div>

  <!-- https://bootstrap-vue.js.org/docs -->
  <script src="//unpkg.com/@babel/polyfill@latest/dist/polyfill.min.js"></script>
  <script src="//unpkg.com/vue@latest/dist/vue.min.js"></script>
  <script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.js"></script>
  <script>
    const app = new Vue({
      el: '#app'
    })
  </script>
</body>

</html>
~~~