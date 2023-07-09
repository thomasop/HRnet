import styles from './Loading.module.scss'

/**
 * React component - Display the loading
 * @return {JSX.Element}
 */
const Loading = (): JSX.Element => {
  return (
    <h2 className={styles.loading}><i>Loading...</i></h2>
  )
}

export default Loading