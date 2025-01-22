<script lang="ts">
  import flags from '$lib/data/country_flags.json'

  // Icons
  import IconReload from '~icons/tabler/reload';
  import IconEye from '~icons/tabler/eye';
  import IconCircleCheck from '~icons/tabler/circle-check';
  import IconCirclex from '~icons/tabler/circle-x';
  import IconPencilOff from '~icons/tabler/pencil-off';
  import IconPencil from '~icons/tabler/pencil';
  import IconInfoCircle from '~icons/tabler/info-circle';

  import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
  import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

  import { fade, fly } from 'svelte/transition'

  
  let flag: {name: string, url: string};

  // 194 = Zimbabwe
  // 195 = Kosovo
  // 196 = Taiwan
  let max = 194 + 1; 

  let quizFlags = flags.slice(0, max); 
  let count = 0;
  let quizComplete = false;

  let revealed = false;

  let quizMode = true;
  let score = 0;
  let flagAnswers: string[] = [];

  let showAnswer = false;
  let correct = true;

  function resetQuiz(){
    count = 0;
    score = 0;
    quizFlags = flags.slice(0, max);
    quizComplete = false;
    showAnswer = false;
    setFlag();
  }

  function setFlagAnswers(){
    flagAnswers = [];
    showAnswer = false;
    correct = false;
    flagAnswers.push(flag.name);

    let randAnswer = getRandomFlag().name;
    while(flagAnswers.length < 3){
      if(!flagAnswers.includes(randAnswer)){
        flagAnswers.push(randAnswer);
        randAnswer = getRandomFlag().name;
      }
      else{
        randAnswer = getRandomFlag().name;
      }
    }

    flagAnswers.sort();
  }

  function getRandomFlag(){
    let rand = Math.floor(Math.random() * max);
    return flags[rand];
  }

  function getNextQuizFlag(){
    let rand = Math.floor(Math.random() * quizFlags.length);
    let newFlag = quizFlags[rand];
    return newFlag;
  }

  function setFlag(){
    flag = quizMode ? getNextQuizFlag() : getRandomFlag();
    revealed = false;
  }

  function reveal(){
    revealed = true;
  }

  setFlag();

  if(quizMode) setFlagAnswers();
</script>

  <!-- TESTING: View All Flags -->
  <!-- {#each quizFlags as flag, i }
    <h4 class="h2 mb-8 flex-none"> {i}: {flag.name} </h4>
    <img src={flag.url} width=200 />
    <hr class="m-2" />
  {/each} -->


{#if !quizComplete}
  <div class="card py-4 grid grid-cols-1 grid-rows-7 lg:grid-rows-6 justify-around lg:justify-between items-center h-contain lg:h-full lg:gap-y-6">

    <div class="lg:row-span-1 row-span-2 row-start-1 lg:h-auto align-middle grid max-lg:grid-rows-2 lg:grid-cols-6 w-full px-8">

      <div class="max-lg:row-start-2 lg:col-start-2 lg:col-span-4 flex justify-center">
        {#if quizMode}
          <div class="w-11/12 text-center flex justify-center">

            <h2 class="h2 mr-2">SCORE: </h2>

            <div class="grid grid-cols-3 grid-rows-1">
              {#key score}
                <h2 class="h2 col-start-1 row-start-1" in:fly={{y: "1em"}} out:fly={{y: "-1em"}}>{score}</h2>
              {/key}
              <h2 class="h2 mx-1 col-start-2 row-start-1"> / </h2>
              {#key count}
                <h2 class="h2 col-start-3 row-start-1" in:fly={{y: "1em"}} out:fly={{y: "-1em"}}>{count}</h2>
              {/key}
            </div>

          </div>
        {:else}
          <div class="w-11/12 text-center {revealed ? '' : 'placeholder animate-pulse py-5'}">
            <h2 class="h2"> {revealed ? flag.name : ''} </h2>
          </div>
        {/if}
      </div>

      <div class="max-lg:mb-4 max-lg:row-start-1 lg:col-start-6 flex justify-center h-fit">
        <RadioGroup>
          <RadioItem bind:group={quizMode} on:change={() => {resetQuiz(); setFlag(); setFlagAnswers();} } name="quizMode" value={true}><IconPencil></IconPencil></RadioItem>
          <RadioItem bind:group={quizMode} on:change={() => {revealed = false; setFlag()} } name="freeMode" value={false}><IconPencilOff></IconPencilOff></RadioItem>
        </RadioGroup>
      </div>

    </div>

    <div class="row-start-3 lg:row-start-2 row-span-4 w-full grid max-lg:mb-4">
      {#key flag}
        <div out:fade={{duration: 300}} in:fade={{duration: 300}} class="h-32 md:h-64 lg:h-96 row-start-1 col-start-1 bg-no-repeat bg-center bg-contain flex justify-center items-center" style="background-image:url('{flag.url}');">
          {#if showAnswer}
            {#if correct}
              <IconCircleCheck width={'100%'} height={'100%'} color='rgba(var(--color-primary-500))' style="opacity: 100% "></IconCircleCheck>
            {:else}
              <IconCirclex width={'100%'} height={'100%'} color='rgba(var(--color-error-500))'></IconCirclex>
            {/if}
          {/if}
        </div>
      {/key}
    </div>

    <div class="row-start-7 lg:row-start-6 w-full flex justify-center">

      {#if quizMode}
        <div class="flex max-md:flex-col md:flex-row justify-center max-md:gap-y-4 md:gap-x-4 w-full">
          {#each flagAnswers as answer}
            <button disabled={showAnswer} type="button" class="btn py-4 {showAnswer ? (answer === flag.name ? 'variant-filled-primary' : 'variant-filled-error') : 'variant-filled'}" on:click={ ()=> {
              count++;
              if(answer === flag.name){
                score++;
                correct = true;
              }
              showAnswer = true;
              setTimeout(() => {
                showAnswer = false;

                if(quizFlags.length > 0){
                  setFlag();
                  setFlagAnswers();
                }
                else{
                  quizComplete = true;
                }
              }, 800);
            } 
            }>{answer}</button>
          {/each}
        </div>
      {:else}
        <button type="button" class="btn variant-filled py-4" on:click={revealed ? setFlag : reveal}>
          <span>
            {#if revealed}
              <IconReload width="32" height="32" />
            {:else}
              <IconEye width="32" height="32"/>
            {/if}
          </span>
          <span class="h3 align-middle text-clip">{revealed ? 'Reload' : 'Reveal'}</span>
        </button>

        <!-- <button type="button" class="btn variant-filled py-4 w-full" on:click={setFlag}>
          <span><IconReload width="32" height="32" /></span>
          <span class="h3">Reload</span>
        </button> -->

      {/if}
      
    </div>
    <Accordion>
      <AccordionItem>
        <svelte:fragment slot="lead"><IconInfoCircle width="32" height="32" /></svelte:fragment>
        <svelte:fragment slot="summary">Note on Methodology</svelte:fragment>
        <svelte:fragment slot="content">
          The set of states included in this app is a reflection of the 193 <a class="anchor" href="https://www.un.org/en/about-us/member-states">United Nation member states</a> as well as the 2 <a class="anchor" href="https://www.un.org/en/about-us/non-member-states">permanent non-member observer states</a>.
          <br />
          Each flag displayed is pulled from its state's default english <a class="anchor" href="https://www.wikipedia.org/">Wikipedia</a> page. 
          The use, inclusion, or exclusion of a flag is not a political comment, but a reflection of the <a class="anchor" href="https://www.un.org/">United Nations</a> and <a class="anchor" href="https://www.wikipedia.org/">Wikimedia Commons</a>.
          <br />
          As the world changes, it's possible that some of the flags and names displayed may become outdated or fail to load from <a class="anchor" href="https://www.wikipedia.org/">Wikimedia Commons</a>.
        </svelte:fragment>
      </AccordionItem>
    </Accordion>
  </div>
{:else}
  <div class="card py-4 h-full flex flex-col items-center">
    <h1 class="h1 mb-8">Quiz Complete</h1>
    <br/>
    <h1 class="h1 text-9xl mb-2">{score} / {count}</h1>
    <br/>
    <h4 class="h3 mb-8">{(score / count).toFixed(2)}%</h4>

    <div class="flex flex-row justify-center gap-x-6">

      <button type="button" class="btn variant-filled py-4" on:click={resetQuiz}>
        <span>
            <IconPencil width="32" height="32"/>
        </span>
        <span class="h3 align-middle text-clip">Reset Quiz</span>
      </button>

      <button type="button" class="btn variant-filled py-4" on:click={() => {quizComplete = false; quizMode = false; revealed = false; setFlag();} }>
        <span>
            <IconPencilOff width="32" height="32"/>
        </span>
        <span class="h3 align-middle text-clip">Free Mode</span>
      </button>

    </div>
  </div>
{/if}