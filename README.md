# 🎞️ Buscador de Gifs

Aplicación web para buscar gifs usando la [API de Giphy](https://developers.giphy.com/).
Proyecto del curso de React en el que practico los fundamentos: estado, efectos
secundarios, consumo de APIs con Axios y organización de componentes con TypeScript.

> 📚 **Contexto:** es un proyecto de aprendizaje. Mi objetivo no fue solo que
> funcione, sino aplicar buenas prácticas desde el inicio y poder explicar el
> porqué de cada decisión. Al final del README están las decisiones técnicas y
> lo que mejoraría.

## ✨ Funcionalidades

- 🔎 Búsqueda con **debounce**: busca automáticamente cuando dejas de escribir (700 ms).
- ⏎ Búsqueda confirmada con **Enter** o con el botón.
- 🕘 **Historial** de las últimas 6 búsquedas, sin duplicados, que se conserva al recargar la página.
- 🔁 Clic en una búsqueda previa para repetirla.
- 🚀 Carga gifs en tendencia al iniciar, para no arrancar con la pantalla vacía.
- ⏳ Estados de **carga**, **error** y **sin resultados**.
- ♿ Búsquedas previas accesibles con teclado (`<button>`) e imágenes con carga diferida.

## 🧰 Tecnologías

| Herramienta | Uso |
| --- | --- |
| React 19 | Interfaz basada en componentes |
| TypeScript | Tipado de props, estado y respuestas de la API |
| Vite | Entorno de desarrollo y build |
| Axios | Cliente HTTP con instancia configurada |
| ESLint + Prettier | Calidad y formato del código |
| pnpm | Gestor de paquetes |

## 🧠 Conceptos de React que practico aquí

**`useState`**
- Un estado por cada dato (`gifs`, `previousSearch`, `isLoading`, `error`, `hasSearched`).
- Tipado explícito: `useState<Gif[]>([])`.
- Actualización **funcional** (`setPreviousSearch(prev => ...)`) para no depender de valores desactualizados.
- Inicialización **perezosa** (`useState(loadPreviousSearches)`) para leer `localStorage` una sola vez.

**`useEffect`**
- **Debounce** en `SearchBar`: programa la búsqueda y la cancela con la función de limpieza (`clearTimeout`).
- **Sincronizar con `localStorage`** cuando cambia el historial.
- **Carga inicial** al montar (`[]`), con una bandera `ignore` en la limpieza para descartar respuestas de un componente desmontado.

**Otros**
- `useCallback` para que `fetchGifs` mantenga la misma referencia y el debounce no se reinicie en cada render.
- Comunicación padre ↔ hijo: los datos bajan por **props**, la información sube llamando **funciones** que el padre entrega (`onQuery`, `onSubmit`, `onLabelClicked`).
- Renderizado condicional para los estados de carga, error y vacío.

**Axios**
- Instancia con `axios.create`: URL base, parámetros comunes y `timeout` de 8 s.
- Respuesta tipada con genéricos y transformada a un modelo propio (`Gif`) en una capa de acciones, para que los componentes no dependan del formato de Giphy.

## 🗂️ Estructura

```
src/
├── GifsApp.tsx                 # Componente raíz: estado y lógica principal
├── gifs/
│   ├── actions/                # Funciones que llaman a la API y transforman datos
│   ├── api/                    # Instancia configurada de Axios
│   ├── components/             # GifList, PreviousSearches
│   └── interfaces/             # Tipos: Gif y respuesta de Giphy
├── shared/components/          # Componentes reutilizables: CustomHeader, SearchBar
└── mock-data/                  # Datos de prueba usados durante el desarrollo
```

## 🚀 Cómo ejecutarlo

1. Instala las dependencias:
   ```bash
   pnpm install
   ```
2. Consigue una API key gratuita en [developers.giphy.com](https://developers.giphy.com/).
3. Crea tu archivo de entorno a partir de la plantilla y pega tu key:
   ```bash
   cp .env.template .env
   ```
   ```env
   VITE_GIPHY_API_KEY=tu_api_key
   ```
   > El archivo `.env` está en `.gitignore`, así que la key no se sube al repositorio.
   > Si cambias el `.env`, reinicia el servidor de desarrollo.
4. Inicia la app:
   ```bash
   pnpm dev
   ```

### Scripts

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Revisa tipos y genera el build de producción |
| `pnpm preview` | Sirve el build localmente |
| `pnpm lint` | Ejecuta ESLint |

## 🔍 Decisiones técnicas

- **Separar "buscar" de "guardar en el historial".** El debounce solo busca; el historial se actualiza únicamente al confirmar con Enter o el botón. Así no se guardan términos a medias como "bat" o "batm".
- **Una sola función para pedir gifs** (`fetchGifs`) en lugar de lógica duplicada en cada manejador.
- **`try/catch/finally`** en las peticiones: el usuario ve un mensaje claro si algo falla y el indicador de carga nunca se queda pegado.
- **Capa de acciones y tipos propios.** La respuesta de Giphy se transforma a un modelo `Gif` simple.
- **`<button>` en vez de `<li onClick>`** para que la navegación por teclado funcione.
- **La API key va en variables de entorno** y se avisa por consola si falta.
- **En desarrollo verás dos peticiones iniciales** en la pestaña Network: es `<StrictMode>`, que monta los componentes dos veces a propósito para detectar efectos con problemas. En producción es una sola.

## 🔭 Próximos pasos

Cosas que sé que se pueden mejorar y que quiero abordar:

- Cancelar peticiones antiguas con `AbortController` para evitar que una respuesta lenta pise a una más reciente.
- Paginación o scroll infinito.
- Pruebas con Vitest y React Testing Library.
- Extraer la lógica de búsqueda a un custom hook (`useGifs`).
- Estilos para los mensajes de carga y error.

## 📄 Licencia

Proyecto educativo sin fines comerciales. Los gifs pertenecen a sus respectivos
autores y se obtienen a través de la API de Giphy.
