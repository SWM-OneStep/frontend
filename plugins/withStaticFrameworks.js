const {
  withDangerousMod,
  createRunOncePlugin,
} = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

/**
 * Modifies the Podfile to include `use_frameworks! :linkage => :static` and `$RNFirebaseAsStaticFramework = true`
 */
const withStaticFrameworks = config => {
  return withDangerousMod(config, [
    'ios',
    async config => {
      const projectRoot = config.modRequest.projectRoot;
      const podfilePath = path.join(projectRoot, 'ios', 'Podfile');

      if (!fs.existsSync(podfilePath)) {
        console.warn(
          'Podfile not found. Skipping static frameworks configuration.',
        );
        return config;
      }

      let podfileContents = fs.readFileSync(podfilePath, 'utf8');

      // Define the lines to add
      const staticFrameworksLine = 'use_frameworks! :linkage => :static';
      const firebaseStaticFrameworkLine = '$RNFirebaseAsStaticFramework = true';

      // Check if `use_frameworks! :linkage => :static` is already present
      const hasStaticFrameworks =
        podfileContents.includes(staticFrameworksLine);

      // Check if `$RNFirebaseAsStaticFramework = true` is already present
      const hasFirebaseStaticFramework = podfileContents.includes(
        firebaseStaticFrameworkLine,
      );

      // Only modify if necessary
      if (!hasStaticFrameworks || !hasFirebaseStaticFramework) {
        // Use a regular expression to find the line starting with 'use_react_native!'
        const useReactNativeRegex = /^.*use_react_native!.*$/m;
        const match = podfileContents.match(useReactNativeRegex);

        if (match) {
          const useReactNativeLine = match[0];

          // Build the new lines to insert before 'use_react_native!'
          const linesToInsert = [];
          if (!hasStaticFrameworks) {
            linesToInsert.push(staticFrameworksLine);
          }
          if (!hasFirebaseStaticFramework) {
            linesToInsert.push(firebaseStaticFrameworkLine);
          }

          // Replace the 'use_react_native!' line with the new lines and 'use_react_native!'
          const newLines = [...linesToInsert, useReactNativeLine].join('\n');
          podfileContents = podfileContents.replace(
            useReactNativeRegex,
            newLines,
          );

          // Save the modified Podfile
          fs.writeFileSync(podfilePath, podfileContents, 'utf8');
          console.log(
            'Podfile modified to include static frameworks settings.',
          );
        } else {
          console.warn(
            'Could not find "use_react_native!" in Podfile. Skipping static frameworks configuration.',
          );
        }
      } else {
        console.log('Podfile already includes static frameworks settings.');
      }

      return config;
    },
  ]);
};

module.exports = createRunOncePlugin(
  withStaticFrameworks,
  'withStaticFrameworks',
  '1.0.1',
);
